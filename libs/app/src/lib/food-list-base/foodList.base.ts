import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectAllFoods } from '../states/foods/food.selector';
import { inject } from '@angular/core';

export abstract class FoodListBase {
  protected store = inject(Store);
  protected subscription$ = new Subscription();
  public foodSelected$ = this.store.pipe(select(selectAllFoods));
}
