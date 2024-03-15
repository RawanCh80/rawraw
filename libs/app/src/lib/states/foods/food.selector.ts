import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FoodState } from './foodReducer';

export const selectFoodFeature = createFeatureSelector<FoodState>('food');
export const selectAllFoods = createSelector(selectFoodFeature, (state: FoodState) => state);
