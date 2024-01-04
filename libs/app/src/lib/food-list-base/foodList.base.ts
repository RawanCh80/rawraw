import { FoodItemBo, FoodsService } from "@rawraw/app";
import { Subscription } from "rxjs";

export abstract class FoodListBase {
  public foodList: FoodItemBo[] = [];
  subscription$ = new Subscription();

  protected constructor(private foodddService: FoodsService) {
  }
  protected getFoodListSubscription() {
    const subscription = this.foodddService
      .getFoods()
      .subscribe(
        (foodList: FoodItemBo[]) => {
          this.foodList = foodList;
        }
      );
    this.subscription$.add(subscription);
  }
}