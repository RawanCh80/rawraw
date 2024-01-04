import { Component } from '@angular/core';
import { FoodListBase, FoodsService } from "@rawraw/app";
import { MatDialog } from "@angular/material/dialog";
import { FoodCreateDialog } from "./food-create-dialog/food-create-dialog";

@Component({
  templateUrl: 'food-list.page.html',
  styleUrls: ['food-list.page.scss'],
})
export class FoodListPage extends FoodListBase {
  isDialogOpen = false;
  constructor(
    private matDialog: MatDialog,
    protected foodService: FoodsService) {
    super(foodService);
  }

  ngOnInit(): void {
    this.getFoodListSubscription();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  presentAddFoodDialog() {
    if (!this.isDialogOpen) {
      this.isDialogOpen=true;
      const dialogRef = this.matDialog.open(FoodCreateDialog, {
        width: '500px',
        height: '300px',
        // Other dialog options
      });

      dialogRef.afterClosed().subscribe(result => {
        this.isDialogOpen=false;
        // Handle actions after dialog is closed if needed
      });

    }
  }

  presentAlertDeleteFood() {

  }

  presentFoodDetailsDialog() {

  }
}
