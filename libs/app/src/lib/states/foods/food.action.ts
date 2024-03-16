import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { FoodItemBo } from '../../foods/bos/food-item.bo';

export const FoodActions = createActionGroup({
  source: 'Foods',
  events: {
    'load Foods': emptyProps(),
    'load Foods Success': props<{ foods: FoodItemBo[] }>(),
    'load Foods Failure': props<{ errorMessage: string }>()
  }
});
