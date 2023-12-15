import { Component } from '@angular/core';
import { FoodItemBo, FoodsService } from "@rawraw/app";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { FoodCreateDialog } from "./food-create-dialog/food-create-dialog";

@Component({
  templateUrl: 'food-list.page.html',
  styleUrl: 'food-list.page.scss',
})
export class FoodListPage {
  public foodList: FoodItemBo[] = [];
  private subscription$ = new Subscription();

  constructor(
    private matDialog: MatDialog,
    private foodService: FoodsService) {
  }

  ngOnInit(): void {
    this.getFoodListSubscription();
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  private getFoodListSubscription() {
    const subscription = this.foodService
      .getFoods()
      .subscribe(
        (foodList: FoodItemBo[]) => {
          this.foodList = foodList;
        }
      );
    this.subscription$.add(subscription);
  }

  presentAddFoodDialog() {
    let dialogRef = this.matDialog.open(FoodCreateDialog, {
      width: '400px',
      height:'350px',
      position: {
        top: '-35%', // Adjust these values to position the dialog as needed
        left: '35%',
      },
    });
  }

}

