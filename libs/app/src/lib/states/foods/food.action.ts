import { FoodItemBo } from '@rawraw/app';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const FoodActions = createActionGroup({
  source: 'Foods',
  events: {
    'load Foods': emptyProps(),
    'load Foods Success': props<{ foods: FoodItemBo[] }>(),
    'load Foods Failure': props<{ errorMessage: string }>()
  }
});
