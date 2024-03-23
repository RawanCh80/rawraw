import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FOOD_DETAILS_KEY,
  FoodActions,
  FoodDetailsBase,
  FoodDetailsStatusEnum,
  FoodForCreationInterface
} from "@rawraw/app";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  templateUrl: './food-details-dialog.html',
  styleUrls: ['./food-details-dialog.scss'],
})
export class FoodDetailsDialog extends FoodDetailsBase implements OnInit, OnDestroy {

  constructor(
    public matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { foodId: string, isEditMode?: boolean }) {
    super();
    this.editMode = this.data?.isEditMode ?? true;
  }

  public ngOnInit(): void {
    this.foodSelectorSubscription();
    if (this.data?.isEditMode) {
      this.store.dispatch(FoodActions.loadFoodDetails({
          foodId: this.data?.foodId
        })
      );
    }
  }

  public ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  protected async dismissModal() {
    this.store.dispatch(FoodActions.resetFoodDetailsStatus());
    return this.matDialog.closeAll();
  }

  protected async dispatchUpdateFood() {
    this.store.dispatch(FoodActions.updateFood({
      foodId: this.data.foodId,
      foodFormDetailsValue: this.foodDetailsForm.value
    }));
  }

  protected async dispatchCreateFood() {
    const foodFormValue = this.foodDetailsForm.value as FoodForCreationInterface;
    this.store.dispatch(FoodActions.createFood({food: foodFormValue}))
  }

  protected foodSelectorSubscription() {
    this.subscription$.add(
      this.foodDetailsSelected$.subscribe({
        next: async (foodDetailsState) => {
          if (foodDetailsState.status === FoodDetailsStatusEnum.loadSuccess) {
            console.log('success')
            this.foodDetailsForm.patchValue({
              label: foodDetailsState[FOOD_DETAILS_KEY].label,
              description: foodDetailsState[FOOD_DETAILS_KEY].description
            })
          }
          if (foodDetailsState.status === FoodDetailsStatusEnum.updateSuccess) {
            this.matSnackBar.open('food updated successfully',
              'Close', {
                duration: 2000
              });
            await this.dismissModal();
          }
          if (foodDetailsState.status === FoodDetailsStatusEnum.updateError) {
            this.matSnackBar.open('food cannot be updated');
          }
          if (foodDetailsState.status === FoodDetailsStatusEnum.createSuccess) {

            this.matSnackBar.open('food created successfully',
              'Close', {
                duration: 3000
              }
            );
            await this.dismissModal();
          }
          if (foodDetailsState.status === FoodDetailsStatusEnum.createError) {
            this.matSnackBar.open('food cannot be created');
          }
        }
      })
    )
  }
}
