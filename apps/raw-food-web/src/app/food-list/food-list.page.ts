import { Component } from '@angular/core';
import { FoodItemBo, FoodListBase, FoodsService } from "@rawraw/app";
import { MatDialog } from "@angular/material/dialog";
import { FoodCreateDialog } from "./food-create-dialog/food-create-dialog";
import { FoodDetailsDialog } from "./food-details-dialog/food-details-dialog";
import { FoodDeleteAlertDialog } from "./food-delete-alert-dialog/food-delete-alert-dialog";

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

  presentAlertDeleteFoodDialog(foodId: string) {
    if (!this.isDialogOpen) {
      this.isDialogOpen = true;
      const dialogRef = this.matDialog
        .open(FoodDeleteAlertDialog,
          {
            data: {
              foodId: foodId
            },
            width: '500px',
            height: '300px',
          });
      dialogRef.afterClosed().subscribe(result => {
        this.isDialogOpen = false;
      });
    }
  }

  presentAddFoodDialog() {
    if (!this.isDialogOpen) {
      this.isDialogOpen = true;
      const dialogRef = this.matDialog
        .open(FoodCreateDialog,
          {
            width: '500px',
            height: '300px',
          });
      dialogRef.afterClosed().subscribe(result => {
        this.isDialogOpen = false;
      });
    }
  }

  presentFoodDetailsDialog(foodItemBo: FoodItemBo) {
    if (!this.isDialogOpen) {
      this.isDialogOpen = true;
      const dialogRef = this.matDialog
        .open(FoodDetailsDialog,
          {
            data: {
              foodId: foodItemBo.id
            },
            width: '500px',
            height: '300px',
          });
      dialogRef.afterClosed().subscribe(result => {
        this.isDialogOpen = false;
      });
    }
  }
}
