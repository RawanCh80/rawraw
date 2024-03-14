import { inject, Injectable } from "@angular/core";
import { FoodsService } from "@rawraw/app";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as FoodActions from "./food.action"
import { catchError, exhaustMap, map, of } from "rxjs";

@Injectable()
export class FoodEffect {
  private api = inject(FoodsService);
  action = inject(Actions);
  loadFoods = createEffect(() =>
    this.action.pipe(
      ofType(FoodActions.loadFood),
      exhaustMap(() => {
          return this.api
            .getFoods()
            .pipe(
              map((result) => {
                return FoodActions.loadFoodSuccess({foods: result})
              }),
              catchError((error) =>
                of(FoodActions.loadFoodFailure({errorMessage: 'Fail to load Foods'})
                )
              )
            )
        }
      )
    )
  );
}
