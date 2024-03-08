import { Component, OnDestroy, OnInit } from '@angular/core';
import { FoodItemBo, FoodListBase, FoodsService } from "@rawraw/app";
import { MatDialog } from "@angular/material/dialog";
import { FoodCreateDialog } from "./food-create-dialog/food-create-dialog";
import { FoodDetailsDialog } from "./food-details-dialog/food-details-dialog";
import { FoodDeleteAlertDialog } from "./food-delete-alert-dialog/food-delete-alert-dialog";

@Component({
  templateUrl: 'food-list.page.html',
  styleUrls: ['food-list.page.scss']
})
export class FoodListPage extends FoodListBase implements OnInit, OnDestroy {
  private isDialogOpen = false;

  constructor(
    private matDialog: MatDialog,
    protected override foodService: FoodsService) {
    super(foodService);
  }

  ngOnInit(): void {
    this.getFoodListSubscription();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  public presentAlertDeleteFoodDialog(foodId: string) {
    if (!this.isDialogOpen) {
      const dialogRef = this.matDialog
        .open(FoodDeleteAlertDialog,
          {
            data: {
              foodId: foodId
            },
            height: '300px',
            width: '1000px',
            hasBackdrop:true
          });
      this.isDialogOpen = true;
      dialogRef.afterClosed().subscribe(result => {
        this.isDialogOpen = false;
      });
    }
  }

  presentAddFoodDialog() {

      const dialogRef = this.matDialog
        .open(FoodCreateDialog, {
          height: '60vh',
          width: '60vh',
          hasBackdrop:true
        });
      dialogRef.afterClosed().subscribe(result => {
        this.isDialogOpen = false;
      });

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
            height: '60vh',
            width: '60vh',
            position: {
              top: '-80vh',
              left: '30vh'
            }
          });
      dialogRef.afterClosed().subscribe(result => {
        this.isDialogOpen = false;
      });
    }
  }
}
