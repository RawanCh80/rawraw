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
          console.log('le effect call');
          return this.foodsService
              .getFoods()
              .pipe(
                map((foodList: FoodItemBo[]) => {
                  console.log('leeeeeeeee');
                  return FoodActions.loadFoodsSuccess({ foods: foodList });
                }),
                catchError((error) => {
                    console.log('leeeeeeeee');
                   return  of(FoodActions.loadFoodsFailure({ errorMessage: 'Fail to load Foods' }))
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
