import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FoodsService } from "@rawraw/app";

@Component({
  templateUrl: './food-delete-alert-dialog.html',
  styleUrl: './food-delete-alert-dialog.css',
})
export class FoodDeleteAlertDialog {

  constructor( public matDialog: MatDialog,
               private foodService: FoodsService){
  }

  deleteFood(){
  }

  dismissDeleteAlertDialog(){
    return this.matDialog.closeAll();
  }

}
