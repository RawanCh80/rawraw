import { createAction, props } from "@ngrx/store";
import { FoodBo, FoodItemBo } from "@rawraw/app";

export const loadFood = createAction('[Food Component] loadFood');
export const loadFoodSuccess = createAction(
  '[Food Component] loadFoodSuccess'
   , props<{ foods: FoodItemBo[] }>()
);
export const loadFoodFailure = createAction(
  '[Food Component] loadFoodFailure',
  props<{ errorMessage: string }>()
);
