import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FoodActions, FoodDetailsBase } from "@rawraw/app";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  templateUrl: './food-details.dialog.html',
  styleUrls: ['./food-details.dialog.scss'],
})
export class FoodDetailsDialog extends FoodDetailsBase implements OnInit, OnDestroy {

  constructor(
    public matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { foodId: string }) {
    super();
  }

  public ngOnInit(): void {
    this.foodId = this.data?.foodId;
    this.loadPage();
  }

  public ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  protected presentToast(message: string, duration: number) {
    this.matSnackBar.open(message, 'Close', {
      duration: duration
    });
  }

  protected async dismissModal() {
    this.store.dispatch(FoodActions.resetFoodDetailsStatus());
    return this.matDialog.closeAll();
  }
}
