import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectAllFoods } from '../states/foods/food.selector';
import { inject } from '@angular/core';

export abstract class FoodListBase {
  protected subscription$ = new Subscription();
}
