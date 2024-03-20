import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FOOD_KEY, FoodState } from './food.reducers';
import { FOOD_DETAILS_KEY, FoodDetailsState } from "./food-details.reducer";

export const selectFoodFeature = createFeatureSelector<FoodState>(FOOD_KEY);
export const selectFoodDetailsFeature = createFeatureSelector<FoodDetailsState>(FOOD_DETAILS_KEY);
export const selectAllFoods = createSelector(selectFoodFeature, (state: FoodState) => state);
export const selectFoodDetails = createSelector(selectFoodDetailsFeature, (state: FoodDetailsState) => state);
