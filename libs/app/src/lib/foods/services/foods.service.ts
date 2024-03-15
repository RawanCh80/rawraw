import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { FoodItemBo } from '../bos/food-item.bo';
import { FoodClient } from '../_clients/foods/food.client';
import { FoodModel } from '../_clients/foods/food.model';
import { FoodForCreationInterface } from '../interfaces/food-for-creation.interface';
import { FoodForCreationDto } from '../dto/food-for-creation.dto';
import { FoodForUpdateInterface } from '../interfaces/food-for-updated.interface';
import { FoodForUpdatedDto } from '../dto/food-for-updated.dto';

@Injectable({ providedIn: 'root' })
export class FoodsService {

  constructor(private foodClient: FoodClient) {
  }

  public getFoods(): Observable<FoodItemBo[]> {
    return this.foodClient
      .getFoods()
      .pipe(
        map((foodModels: FoodModel[]) => {
          return foodModels.map((foodModel: FoodModel) => new FoodItemBo(foodModel));
        })
      );
  }

  public getFood(foodId: string): Observable<FoodItemBo> {
    return this.foodClient
      .getFood(foodId)
      .pipe(
        map((foodModels: FoodModel) => new FoodItemBo(foodModels))
      );
  }

  public createFood(foodForCreationFormValue: FoodForCreationInterface): Observable<any> {
    const foodForCreationDto = new FoodForCreationDto(foodForCreationFormValue);
    return this.foodClient.createFood(foodForCreationDto);
  }

  public deleteFood(foodId: string): Observable<any> {
    return this.foodClient.deleteFood(foodId);
  }

  public updateFood(foodId: string, foodFormDetailsValue: FoodForUpdateInterface): Observable<any> {
    const foodForUpdatedDto = new FoodForUpdatedDto(foodFormDetailsValue);
    return this.foodClient.updateFood(foodId, foodForUpdatedDto);
  }
}
