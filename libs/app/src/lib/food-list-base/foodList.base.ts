import { FoodItemBo, FoodsService } from "@rawraw/app";
import { Subscription } from "rxjs";

export abstract class FoodListBase {
  protected foodList: FoodItemBo[] = [];
  protected subscription$ = new Subscription();

  protected constructor(protected foodService: FoodsService) {
  }

  protected getFoodListSubscription() {
    const subscription = this.foodService
      .getFoods()
      .subscribe(
        (foodList: FoodItemBo[]) => {
          this.foodList = foodList;
        }
      );
    this.subscription$.add(subscription);
  }
}
