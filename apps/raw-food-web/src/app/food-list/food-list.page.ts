import { Component, OnDestroy, OnInit } from '@angular/core';
import { FoodActions, FoodItemBo, FoodListBase } from '@rawraw/app';
import { MatDialog } from '@angular/material/dialog';
import { FoodCreateDialog } from './food-create-dialog/food-create-dialog';
import { FoodDetailsDialog } from './food-details-dialog/food-details-dialog';
import { FoodDeleteAlertDialog } from './food-delete-alert-dialog/food-delete-alert-dialog';
import { lastValueFrom } from 'rxjs';

@Component({
  templateUrl: 'food-list.page.html',
  styleUrls: ['food-list.page.scss']
})
export class FoodListPage extends FoodListBase implements OnInit, OnDestroy {
  private isDialogOpen = false;

  constructor(
    private matDialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(FoodActions.loadFoods());
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  public async presentAlertDeleteFoodDialog(foodId: string) {
    if (!this.isDialogOpen) {
      const dialogRef = this.matDialog
        .open(FoodDeleteAlertDialog,
          {
            data: {
              foodId: foodId
            },
            height: '300px',
            width: '1000px',
            hasBackdrop: true
          });
      this.isDialogOpen = true;
      await lastValueFrom(dialogRef.afterClosed());
      this.isDialogOpen = false;
    }
  }

  public async presentAddFoodDialog() {
    const dialogRef = this.matDialog
      .open(FoodCreateDialog, {
        height: '60vh',
        width: '60vh',
        hasBackdrop: true
      });
    await lastValueFrom(dialogRef.afterClosed());
    this.isDialogOpen = false;
  }

  public async presentFoodDetailsDialog(foodItemBo: FoodItemBo) {
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
      await lastValueFrom(dialogRef.afterClosed());
      this.isDialogOpen = false;
    }
  }
}
