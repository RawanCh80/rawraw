import { Injectable } from '@angular/core';
import { FoodActions, FoodItemBo, FoodsService } from '@rawraw/app';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class FoodEffect {
  public $loadFoods = createEffect(() =>
    this.actions$
      .pipe(
        ofType(FoodActions.loadFoods),
        exhaustMap(() => {
            return this.foodsService
              .getFoods()
              .pipe(
                map((foodList: FoodItemBo[]) => {
                  return FoodActions.loadFoodsSuccess({ foods: foodList });
                }),
                catchError((error) =>
                  of(FoodActions.loadFoodsFailure({ errorMessage: 'Fail to load Foods' }))
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
