import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FoodActions, FoodItemBo, FoodListBase, selectAllFoods } from '@rawraw/app';
import { MatDialog } from '@angular/material/dialog';
import { FoodDetailsDialog } from './food-details-dialog/food-details-dialog';
import { FoodDeleteAlertDialog } from './food-delete-alert-dialog/food-delete-alert-dialog';
import { lastValueFrom } from 'rxjs';
import { LetDirective } from "@ngrx/component";
import { MatButton } from "@angular/material/button";
import { CommonModule } from '@angular/common';
import { IonicModule } from "@ionic/angular";
import { select, Store } from "@ngrx/store";

@Component({
  templateUrl: 'food-list.page.html',
  styleUrls: ['food-list.page.scss'],
  imports: [
    CommonModule,
    LetDirective,
    MatButton,
    IonicModule
  ],
  standalone: true
})
export class FoodListPage extends FoodListBase implements OnInit, OnDestroy {
  protected store = inject(Store);
  protected foodListSelected$ = this.store.pipe(select(selectAllFoods));

  constructor(private matDialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(FoodActions.loadFoods());
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  protected async presentAlertDeleteFood(foodId: string) {
    const dialogRef = this.matDialog
      .open(FoodDeleteAlertDialog,
        {
          data: {
            foodId: foodId
          },
          height: '158px',
          width: '1000px',
          hasBackdrop: true
        });
    await lastValueFrom(dialogRef.afterClosed());
  }

  protected async presentAddFoodModal() {
    this.isEditMode = false;
    const dialogRef = this.matDialog
      .open(FoodDetailsDialog, {
        data: {
          isEditMode: this?.isEditMode
        },
        height: '400px',
        width: '500px',
        hasBackdrop: true
      });
    await lastValueFrom(dialogRef.afterClosed());
  }

  protected async presentFoodDetailsModal(foodItemBo: FoodItemBo) {
    this.isEditMode = true;
    const dialogRef = this.matDialog
      .open(FoodDetailsDialog,
        {
          data: {
            foodId: foodItemBo.id,
            isEditMode: this?.isEditMode
          },
          height: '500px',
          width: '500px',
          hasBackdrop: true
        });
    await lastValueFrom(dialogRef.afterClosed());
  }
}
