import { FoodActions, FoodBo } from '@rawraw/app';
import { createReducer, on } from '@ngrx/store';
import { HttpStatusEnum } from '../enums/http-status.enum';

export const FOOD_KEY = 'foodKey';

export interface FoodState {
  [FOOD_KEY]: FoodBo[];
  status: HttpStatusEnum;
  error: string | null;
}

export const initialFoodState: FoodState = {
  [FOOD_KEY]: null,
  status: HttpStatusEnum.pending,
  error: null
};
export const foodReducer = createReducer(
  initialFoodState,
  on(FoodActions.loadFoodSuccess, (state, { foods }) => ({
    ...state,
    [FOOD_KEY]: foods,
    status: HttpStatusEnum.loading,
    error: null
  })),
  on(FoodActions.loadFoodFailure, (state: FoodState, { errorMessage }) => ({
    ...state,
    status: HttpStatusEnum.error,
    error: errorMessage
  }))
);
