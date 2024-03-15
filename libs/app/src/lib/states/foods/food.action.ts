import { FoodItemBo } from '@rawraw/app';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const FoodActions = createActionGroup({
  source: 'Food',
  events: {
    loadFood: emptyProps(),
    loadFoodSuccess: props<{ foods: FoodItemBo[] }>(),
    loadFoodFailure: props<{ errorMessage: string }>()
  }
});
