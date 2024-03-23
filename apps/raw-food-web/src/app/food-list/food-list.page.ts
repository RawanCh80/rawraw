import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FOOD_KEY, FoodActions, FoodItemBo, FoodListBase, HttpStatusEnum, selectAllFoods } from '@rawraw/app';
import { MatDialog } from '@angular/material/dialog';
import { FoodCreateDialog } from './food-create-dialog/food-create-dialog';
import { FoodDetailsDialog } from './food-details-dialog/food-details-dialog';
import { FoodDeleteAlertDialog } from './food-delete-alert-dialog/food-delete-alert-dialog';
import { lastValueFrom } from 'rxjs';
import { select, Store } from "@ngrx/store";
import { LetDirective } from "@ngrx/component";
import { MatButton } from "@angular/material/button";
import { CommonModule } from '@angular/common';
import { IonicModule } from "@ionic/angular";

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
export class FoodListPage extends FoodListBase implements OnInit, OnDestroy,AfterViewInit {

  public foodListSelected$ = this.store.pipe(select(selectAllFoods));

  constructor(
    private store: Store,
    private matDialog: MatDialog) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(FoodActions.loadFoods());
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
ngAfterViewInit(){

}
  public async presentAlertDeleteFoodDialog(foodId: string) {
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

  public async presentAddFoodDialog() {
    const dialogRef = this.matDialog
      .open(FoodCreateDialog, {
        height: '400px',
        width: '500px',
        hasBackdrop: true
      });
    await lastValueFrom(dialogRef.afterClosed());
  }

  public async presentFoodDetailsDialog(foodItemBo: FoodItemBo) {
    const dialogRef = this.matDialog
      .open(FoodDetailsDialog,
        {
          data: {
            foodId: foodItemBo.id
          },
          height: '500px',
          width: '500px',
          hasBackdrop: true
        });
    await lastValueFrom(dialogRef.afterClosed());
  }

  protected readonly FOOD_KEY = FOOD_KEY;
  protected readonly HttpStatusEnum = HttpStatusEnum;
}
