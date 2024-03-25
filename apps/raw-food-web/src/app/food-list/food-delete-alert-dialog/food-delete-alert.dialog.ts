import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { select, Store } from "@ngrx/store";
import { FoodActions, FoodDetailsStatusEnum, selectFoodDetails } from "@rawraw/app";

@Component({
  templateUrl: './food-delete-alert.dialog.html',
  styleUrl: './food-delete-alert.dialog.scss',
})
export class FoodDeleteAlertDialog implements OnInit, OnDestroy {

  private subscription$ = new Subscription();
  public foodDetailsSelected$ = this.store.pipe(select(selectFoodDetails));

  constructor(public matDialog: MatDialog,
              public matSnackBar: MatSnackBar,
              protected store: Store,
              @Inject(MAT_DIALOG_DATA) public data: { foodId: string }) {
  }

  ngOnInit(): void {
    this.foodSelectorSubscription();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }


  public async dismissDeleteAlertDialog() {
    return this.matDialog.closeAll();
  }

  private foodSelectorSubscription() {
    this.subscription$.add(
      this.foodDetailsSelected$.subscribe({
          next: async (foodDetailsState) => {
            if (foodDetailsState.status === FoodDetailsStatusEnum.deleteSuccess) {
              this.matSnackBar.open('food deleted successfully',
                'Close', {
                  duration: 2000
                });
              await this.dismissDeleteAlertDialog();
            }
            if (foodDetailsState.status === FoodDetailsStatusEnum.deleteError) {
              this.matSnackBar.open('food cannot be deleted');
            }
          }
        }
      )
    )
  }

  async dispatchDeleteFood() {
    this.store.dispatch(FoodActions.deleteFood({
        foodId: this.data.foodId
      })
    );
  }
}
