import { FoodBo } from "@rawraw/app";
import { createReducer, on } from "@ngrx/store";
import * as FoodActions from "./food.action"

export interface FoodState {
  foods: FoodBo[];
  error: string | null;
}

export const initialFoodState: FoodState = {
  foods: [],
  error: null
}
export const FoodReducer = createReducer(
  initialFoodState,
  on(FoodActions.loadFoodSuccess, (state, {foods}) => ({
    ...state,
    foods,
    error: null
  })),
  on(FoodActions.loadFoodFailure, (state: FoodState, {errorMessage}) => ({
    ...state,
    error: errorMessage,
  }))
);
