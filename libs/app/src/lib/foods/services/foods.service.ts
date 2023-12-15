import { Injectable } from "@angular/core";
import { FoodClient, FoodForCreationInterface, FoodForUpdateInterface } from "../../../index";
import { map, Observable, startWith, Subject, switchMap, tap } from "rxjs";

import { FoodItemBo } from "../bos/food-item.bo";
import { FoodModel } from "../../../index";
import { FoodForCreationDto } from "../../../index";
import { FoodForUpdatedDto } from "../../../index";


@Injectable({
  providedIn: 'root'
})
export class FoodsService {
  private refreshFoodsSubject$ = new Subject();

  constructor(private foodClient: FoodClient) {
  }


  public getFoods(): Observable<FoodItemBo[]> {
    return this.refreshFoodsSubject$
      .pipe(
        startWith(null),
        switchMap(() => {
            return this.foodClient
              .getFoods()
              .pipe(
                map((foodModels: FoodModel[]) => {
                  return foodModels.map((foodModel: FoodModel) => new FoodItemBo(foodModel))
                })
              );
          }
        )
      )
  }

  public getFood(foodId: string): Observable<FoodItemBo> {
    return this.foodClient
      .getFood(foodId)
      .pipe(
        map((foodModels: FoodModel) => new FoodItemBo(foodModels))
      )
  }

  public createFood(foodForCreationFormValue: FoodForCreationInterface): Observable<any> {
    const foodForCreationDto = new FoodForCreationDto(foodForCreationFormValue);
    return this.foodClient
      .createFood(foodForCreationDto)
      .pipe(
        tap(() => {
          this.refreshFoodList();
        })
      );
  }

  public deleteFood(foodId: string): Observable<any> {
    return this.foodClient
      .deleteFood(foodId)
      .pipe(
        tap(() => {
          this.refreshFoodList();
        })
      );
  }

  public updateFood(foodId: string, foodFormDetailsValue: FoodForUpdateInterface): Observable<any> {
    const foodForUpdatedDto = new FoodForUpdatedDto(foodFormDetailsValue);
    return this.foodClient
      .updateFood(foodId, foodForUpdatedDto)
      .pipe(
        tap(() => {
          this.refreshFoodList();
        })
      );
  }

  private refreshFoodList() {
    this.refreshFoodsSubject$.next(null);
  }
}
