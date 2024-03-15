import { inject, Injectable } from '@angular/core';
import { FoodActions, FoodsService } from '@rawraw/app';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class FoodEffect {
  loadFoods = createEffect(() =>
    this.actions$.pipe(
      ofType(FoodActions.loadFood),
      exhaustMap(() => {
          return this.foodsService
            .getFoods()
            .pipe(
              map((result) => {
                return FoodActions.loadFoodSuccess({ foods: result });
              }),
              catchError((error) =>
                of(FoodActions.loadFoodFailure({ errorMessage: 'Fail to load Foods' }))
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
