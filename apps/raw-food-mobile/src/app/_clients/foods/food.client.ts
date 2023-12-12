import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FoodModel } from "./food.model";
import { Observable } from "rxjs";
import { FoodForCreationDto } from "../../food-list/food-create-modal/dto/food-for-creation-dto";
import { FoodForUpdatedDto } from "../../food-list/food-details-modal/dto/food-for-updated-dto";
import { FoodItemModel } from "./food-item.model";

@Injectable({
  providedIn: 'root'
})
export class FoodClient {
  private baseUrl: string = "http://localhost:3000/foods";
  private httpOptions = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private httpClient: HttpClient) {
  }

  public getFoods(): Observable<FoodItemModel[]> {
    return this.httpClient.get<FoodItemModel[]>(this.baseUrl);
  }

  public getFood(foodId: string): Observable<FoodModel> {
    return this.httpClient.get<FoodModel>(`${this.baseUrl}/${foodId}`);
  }

  public createFood(foodForCreationDto: FoodForCreationDto): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl, foodForCreationDto, {headers: this.httpOptions});
  }

  public deleteFood(foodId: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${foodId}`);
  }

  public updateFood(foodId: string, foodForUpdateDto: FoodForUpdatedDto): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/${foodId}`, foodForUpdateDto, {headers: this.httpOptions});
  }
}
