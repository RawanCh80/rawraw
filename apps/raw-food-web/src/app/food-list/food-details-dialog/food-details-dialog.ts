import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { FoodActions, FoodDetailsStatusEnum, FoodItemBo, selectFoodDetails } from "@rawraw/app";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { select, Store } from "@ngrx/store";

interface FoodForUpdateFormGroupInterface {
  label: FormControl<string>;
  description: FormControl<string>;
}

@Component({
  templateUrl: './food-details-dialog.html',
  styleUrls: ['./food-details-dialog.scss'],
})
export class FoodDetailsDialog implements OnInit, OnDestroy {
  public foodDetailsForm: FormGroup;
  private subscription$ = new Subscription();
  public foodDetailsSelected$ = this.store.pipe(select(selectFoodDetails));

  constructor(
    public matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    protected store: Store,
    @Inject(MAT_DIALOG_DATA) public data: { food: FoodItemBo }) {
    this.foodDetailsForm = new FormGroup<FoodForUpdateFormGroupInterface>({
        label: new FormControl(''),
        description: new FormControl('')
      }
    );
  }

  ngOnInit(): void {
    this.foodSelectorSubscription();
    this.store.dispatch(FoodActions.loadFoodDetails({
        foodId: this.data.food.id
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  public async dismissDialog() {
    return this.matDialog.closeAll();
  }

  async dispatchUpdateFood() {
    this.store.dispatch(FoodActions.updateFood({
      foodId: this.data.food.id,
      foodFormDetailsValue: this.foodDetailsForm.value
    }));
  }

  private foodSelectorSubscription() {
    this.subscription$.add(
      this.foodDetailsSelected$.subscribe({
        next: async (foodDetailsState) => {
          if (foodDetailsState.status === FoodDetailsStatusEnum.loadSuccess) {
            console.log('success')
            this.foodDetailsForm.patchValue({
              label: this.data.food.label,
              description: this.data.food.description
            })
          }
          if (foodDetailsState.status === FoodDetailsStatusEnum.updateSuccess) {
            this.matSnackBar.open('food updated successfully',
              'Close', {
                duration: 2000
              });
            await this.dismissDialog();
          }
          if (foodDetailsState.status === FoodDetailsStatusEnum.updateError) {
            this.matSnackBar.open('food cannot be updated');
          }
        }
      })
    )
  }
}
