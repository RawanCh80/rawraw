import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { FoodItemBo } from '../../foods/bos/food-item.bo';
import { FoodForUpdatedDto } from "../../foods/dto/food-for-updated.dto";
import { FoodForUpdateInterface } from "../../foods/interfaces/food-for-updated.interface";
import { FoodForCreationInterface } from "../../foods/interfaces/food-for-creation.interface";

export const FoodActions = createActionGroup({
  source: 'Foods',
  events: {
    'create Food': props<{ food: FoodForCreationInterface }>(),
    'create Food Success': emptyProps(),
    'create Food Failure': props<{ errorMessage: string }>(),
    'load Food Details': props<{ foodId: string }>(),
    'load Food Details Success': props<{ food: FoodItemBo }>(),
    'load Food Details Failure': props<{ errorMessage: string }>(),
    'load Foods': emptyProps(),
    'load Foods Success': props<{ foods: FoodItemBo[] }>(),
    'load Foods Failure': props<{ errorMessage: string }>(),
    'update Food': props<{ foodId: string, foodFormDetailsValue: FoodForUpdateInterface }>(),
    'update Food Success': emptyProps(),
    'update Food Failure': props<{ errorMessage: string }>(),
    'delete Food': props<{ foodId: string }>(),
    'delete Food Success': emptyProps(),
    'delete Food Failure': props<{ errorMessage: string }>(),
  }
});
