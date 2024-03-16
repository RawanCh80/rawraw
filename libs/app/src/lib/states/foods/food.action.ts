import { FoodItemBo } from '@rawraw/app';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const FoodActions = createActionGroup({
  source: 'Food',
  events: {
    loadFoodDetails: props<{ foodId: string }>(),
    loadFoodDetailsSuccess: props<{ food: FoodItemBo }>(),
    loadFoodDetailsFailure: props<{ errorMessage: string }>(),
    loadFoods: emptyProps(),
    loadFoodsSuccess: props<{ foods: FoodItemBo[] }>(),
    loadFoodsFailure: props<{ errorMessage: string }>(),
    createFood: props<{ food: FoodItemBo }>(),
    createFoodSuccess: props<{ food: FoodItemBo }>(),
    createFoodFailure: props<{ errorMessage: string }>(),
    updateFood: props<{ food: FoodItemBo }>(),
    updateFoodSuccess: props<{ food: FoodItemBo }>(),
    updateFoodFailure: props<{ errorMessage: string }>(),
    deleteFood: props<{ foodId: string }>(),
    deleteFoodSuccess: props<{ food: FoodItemBo }>(),
    deleteFoodFailure: props<{ errorMessage: string }>()
  }
});
