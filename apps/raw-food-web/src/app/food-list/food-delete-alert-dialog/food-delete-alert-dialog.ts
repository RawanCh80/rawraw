import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { FoodsService } from "@rawraw/app";
import { lastValueFrom } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  templateUrl: './food-delete-alert-dialog.html',
  styleUrl: './food-delete-alert-dialog.css',
})
export class FoodDeleteAlertDialog {

  constructor(public matDialog: MatDialog,
              public matSnackBar:MatSnackBar,
              private foodService: FoodsService,
              @Inject(MAT_DIALOG_DATA) public data: { foodId: string }) {
  }

  public async dismissDeleteAlertDialog() {
    return this.matDialog.closeAll();
  }
 async deleteFood() {
    try{
    await lastValueFrom(this.foodService
      .deleteFood(this.data.foodId));
      let matSnackBar = this.matSnackBar
        .open('food deleted successfully',
          'Close', {
            duration: 2000,
            horizontalPosition: "center",
            verticalPosition: "top"
          });
      await this.dismissDeleteAlertDialog();
    } catch (err) {
      let snackBar = this.matSnackBar
        .open('food cannot be deleted');
      console.error('');
    }
  }

}
