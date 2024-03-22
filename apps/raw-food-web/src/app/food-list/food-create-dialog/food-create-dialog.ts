import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { FoodActions, FoodDetailsStatusEnum, FoodForCreationInterface, selectFoodDetails } from "@rawraw/app";
import { MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { select, Store } from "@ngrx/store";

interface FoodForCreationFormGroupInterface {
  label: FormControl<string>;
  description: FormControl<string>;
}

@Component({
  templateUrl: './food-create-dialog.html',
  styleUrls: ['./food-create-dialog.scss'],
})

export class FoodCreateDialog implements OnInit, OnDestroy {
  public foodForm = new FormGroup<FoodForCreationFormGroupInterface>({
    label: new FormControl('', {nonNullable: true}),
    description: new FormControl('', {nonNullable: true})
  });
  private subscription$ = new Subscription();
  public foodDetailsSelected$ = this.store.pipe(select(selectFoodDetails));

  constructor(
    public matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    protected store: Store) {
  }

  ngOnInit(): void {
    this.foodSelectorSubscription();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  public async dismissDialog() {
    return this.matDialog.closeAll();
  }

  public async dispatchCreateFood() {
    const foodFormValue = this.foodForm.value as FoodForCreationInterface;
    this.store.dispatch(FoodActions.createFood({food: foodFormValue}))
  }

  private foodSelectorSubscription() {
    this.subscription$.add(
      this.foodDetailsSelected$.subscribe({
        next: async (foodDetailsState) => {
          if (foodDetailsState.status === FoodDetailsStatusEnum.createSuccess) {

            this.matSnackBar.open('food created successfully',
              'Close', {
                duration: 3000
              }
            );
            await this.dismissDialog();
          }
          if (foodDetailsState.status === FoodDetailsStatusEnum.createError) {
            this.matSnackBar.open('food cannot be created');
          }
        }
      })
    )
  }
}
