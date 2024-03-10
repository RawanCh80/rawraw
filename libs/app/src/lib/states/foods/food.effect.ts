import { inject, Injectable } from "@angular/core";
import { FoodsService } from "@rawraw/app";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as FoodActions from "./food.action"
import { catchError, map, of, switchMap } from "rxjs";

@Injectable()
export class FoodEffect {
  private api = inject(FoodsService);
  action = inject(Actions);
  loadFoods = createEffect(() =>
    this.action.pipe(
      ofType(FoodActions.loadFood),
      switchMap(() =>
        this.api.getFoods().pipe(
          map((result) => FoodActions.loadFoodSuccess({foods: result})),
          catchError((error: { message: string }) =>
            of(
              FoodActions.loadFoodFailure({
                errorMessage: 'Fail to load Foods'})
            )
          )
        )
      )
    )
  );
}
