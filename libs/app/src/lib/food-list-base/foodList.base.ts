import { Subscription } from 'rxjs';

export abstract class FoodListBase {
  protected subscription$ = new Subscription();
}
