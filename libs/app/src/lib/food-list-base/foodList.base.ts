import { Subscription } from 'rxjs';
import { FOOD_KEY, FoodItemBo, HttpStatusEnum } from '@rawraw/app';

export abstract class FoodListBase {
  protected isEditMode = false;
  protected subscription$ = new Subscription();

  constructor() {
  }

  protected abstract presentAlertDeleteFood(foodId: string): Promise<void>;

  protected abstract presentAddFoodModal(): Promise<void>;

  protected abstract presentFoodDetailsModal(foodItemBo: FoodItemBo): Promise<void>;

  protected readonly FOOD_KEY = FOOD_KEY;
  protected readonly HttpStatusEnum = HttpStatusEnum;
}
