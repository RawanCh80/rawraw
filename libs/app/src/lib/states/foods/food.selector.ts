import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FOOD_KEY, FoodState } from './food.reducers';

export const selectFoodFeature = createFeatureSelector<FoodState>(FOOD_KEY);
export const selectAllFoods = createSelector(selectFoodFeature, (state: FoodState) => state);
