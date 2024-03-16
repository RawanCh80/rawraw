import { FoodActions, FoodBo } from '@rawraw/app';
import { Action, createReducer, on } from '@ngrx/store';
import { HttpStatusEnum } from '../enums/http-status.enum';

export const FOOD_KEY = 'foodKey';

export interface FoodState {
  readonly [FOOD_KEY]: FoodBo[];
  readonly status: HttpStatusEnum;
  readonly error: string;
}

const initialFoodState: FoodState = {
  [FOOD_KEY]: null,
  status: HttpStatusEnum.pending,
  error: null
};

export const foodReducers = createReducer<FoodState, Action>(initialFoodState,
  on(FoodActions.loadFoods, (state: FoodState) => {
    return {
      ...state,
      status: HttpStatusEnum.loading
    }
  }),
  on(FoodActions.loadFoodsSuccess, (state: FoodState, { foods }) => {
    return {
      ...state,
      [FOOD_KEY]: foods,
      status: HttpStatusEnum.success,
      error: null
    }
  }),
  on(FoodActions.loadFoodsFailure, (state: FoodState, { errorMessage }) => ({
    ...state,
    status: HttpStatusEnum.error,
    error: errorMessage
  }))
);

