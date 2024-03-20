import { FoodActions, FoodBo } from "@rawraw/app";
import { FoodDetailsStatusEnum } from "../enums/food-details-status.enum";
import { Action, createReducer, on } from "@ngrx/store";

export const FOOD_DETAILS_KEY = 'foodDetailsKey';

export interface FoodDetailsState {
  readonly [FOOD_DETAILS_KEY]: FoodBo;
  readonly status: FoodDetailsStatusEnum;
  readonly error: string;
}

const initialFoodDetailsState: FoodDetailsState = {
  [FOOD_DETAILS_KEY]: null,
  status: FoodDetailsStatusEnum.pending,
  error: null
};
export const foodDetailsReducers = createReducer<FoodDetailsState, Action>(initialFoodDetailsState
  , on(FoodActions.createFood, (state,) => {
      return {
        ...state,
        status: FoodDetailsStatusEnum.loading,
        error: null
      }
    }
  )
  , on(FoodActions.createFoodSuccess, (state,) => {
      return {
        ...state,
        status: FoodDetailsStatusEnum.createSuccess,
        error: null
      }
    }
  )
  , on(FoodActions.createFoodFailure, (state: FoodDetailsState, {errorMessage}) => {
      return {
        ...state,
        status: FoodDetailsStatusEnum.createError,
        error: errorMessage
      }
    }
  )
  , on(FoodActions.loadFoodDetails, (state,) => {
      return {
        ...state,
        status: FoodDetailsStatusEnum.loading,
        error: null
      }
    }
  )
  , on(FoodActions.loadFoodDetailsSuccess, (state,) => {
      return {
        ...state,
        status: FoodDetailsStatusEnum.loadSuccess,
        error: null
      }
    }
  )
  , on(FoodActions.loadFoodDetailsFailure, (state: FoodDetailsState, {errorMessage}) => {
      return {
        ...state,
        status: FoodDetailsStatusEnum.loadError,
        error: errorMessage
      }
    }
  )
  , on(FoodActions.updateFood, (state,) => {
    return {
      ...state,
      status: FoodDetailsStatusEnum.loading,
      error: null
    }
  })
  , on(FoodActions.updateFoodSuccess, (state,) => {
      return {
        ...state,
        status: FoodDetailsStatusEnum.updateSuccess,
        error: null
      }
    }
  )
  , on(FoodActions.updateFoodFailure, (state: FoodDetailsState, {errorMessage}) => {
      return {
        ...state,
        status: FoodDetailsStatusEnum.updateError,
        error: errorMessage
      }
    }
  ),
  on(FoodActions.deleteFood, (state,) => {
      return {
        ...state,
        status: FoodDetailsStatusEnum.loading,
        error: null
      }
    }
  ),
  on(FoodActions.deleteFoodSuccess, (state,) => {
      return {
        ...state,
        status: FoodDetailsStatusEnum.deleteSuccess,
        error: null
      }
    }
  )
  , on(FoodActions.deleteFoodFailure, (state: FoodDetailsState, {errorMessage}) => {
      return {
        ...state,
        status: FoodDetailsStatusEnum.deleteError,
        error: null
      }
    }
  )
);
