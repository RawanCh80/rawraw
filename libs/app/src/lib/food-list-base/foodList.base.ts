import { Subscription } from 'rxjs';
import { FOOD_KEY, FoodItemBo, HttpStatusEnum, selectAllFoods } from '@rawraw/app';
import { inject } from "@angular/core";
import { select, Store } from "@ngrx/store";

export abstract class FoodListBase {
  protected subscription$ = new Subscription();
  protected store = inject(Store);
  protected foodListSelected$ = this.store.pipe(select(selectAllFoods));

  constructor() {
  }

  protected abstract presentAlertDeleteFood(foodId: string): Promise<void>;

  protected abstract presentAddFoodModal(): Promise<void>;

  protected abstract presentFoodDetailsModal(foodItemBo: FoodItemBo): Promise<void>;

  protected readonly FOOD_KEY = FOOD_KEY;
  protected readonly HttpStatusEnum = HttpStatusEnum;
}
