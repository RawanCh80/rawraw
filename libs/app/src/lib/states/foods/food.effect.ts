import { Injectable } from '@angular/core';
import { FoodActions, FoodItemBo, FoodsService } from '@rawraw/app';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';

@Injectable()
export class FoodEffect {

  public $createFood = createEffect(() =>
    this.actions$
      .pipe(
        ofType(FoodActions.createFood),
        exhaustMap((action) => {
            return this.foodsService
              .createFood(
                {
                  label: action.food.label,
                  description: action.food.description
                }
              )
              .pipe(
                switchMap((food: FoodItemBo) => {
                  return [
                    FoodActions.createFoodSuccess(),
                    FoodActions.loadFoods(),
                    FoodActions.resetFoodDetailsStatus()
                  ];
                }),
                catchError((error) => {
                    return of(FoodActions.createFoodFailure({errorMessage: 'Fail to load Food Details'}))
                  }
                )
              );
          }
        )
      )
  );
  public $loadFoods = createEffect(() =>
    this.actions$
      .pipe(
        ofType(FoodActions.loadFoods),
        exhaustMap(() => {
            return this.foodsService
              .getFoods()
              .pipe(
                map((foodList: FoodItemBo[]) => {
                  return FoodActions.loadFoodsSuccess({foods: foodList});
                }),
                catchError((error) => {
                    return of(FoodActions.loadFoodsFailure({errorMessage: 'Fail to load Foods'}))
                  }
                )
              );
          }
        )
      )
  );
  public $loadFoodDetails = createEffect(() =>
    this.actions$
      .pipe(
        ofType(FoodActions.loadFoodDetails),
        exhaustMap((action) => {
            return this.foodsService
              .getFood(action.foodId)
              .pipe(
                map((food: FoodItemBo) => {
                  return FoodActions.loadFoodDetailsSuccess({food});
                }),
                catchError((error) => {
                    return of(FoodActions.loadFoodDetailsFailure({errorMessage: 'Fail to load Food Details'}))
                  }
                )
              );
          }
        )
      )
  );
  public $updateFood = createEffect(() =>
    this.actions$
      .pipe(
        ofType(FoodActions.updateFood),
        exhaustMap((action) => {
            return this.foodsService
              .updateFood(action.foodId, action.foodFormDetailsValue)
              .pipe(
                switchMap((food: FoodItemBo) => {
                  return [
                    FoodActions.updateFoodSuccess()
                    , FoodActions.loadFoods()
                    , FoodActions.resetFoodDetailsStatus()
                  ];
                }),
                catchError((error) => {
                    return of(FoodActions.deleteFoodFailure({errorMessage: 'Fail to update Food'}))
                  }
                )
              )
          }
        )
      )
  );

  public $deleteFood = createEffect(() =>
    this.actions$
      .pipe(
        ofType(FoodActions.deleteFood),
        exhaustMap((action) => {
            return this.foodsService
              .deleteFood(action.foodId)
              .pipe(
                switchMap((food: FoodItemBo) => {
                  return [
                    FoodActions.deleteFoodSuccess()
                    , FoodActions.loadFoods()
                    , FoodActions.resetFoodDetailsStatus()
                  ];
                }),
                catchError((error) => {
                    return of(FoodActions.deleteFoodFailure({errorMessage: 'Fail to delete Food'}))
                  }
                )
              );
          }
        )
      )
  );

  constructor(private actions$: Actions,
              private foodsService: FoodsService) {
  }
}
