import { FoodModel } from "../../_clients/foods/food.model";

export class FoodItemBo {
  id: string;
  label: string;
  description: string;

  constructor(foodModel: FoodModel) {
    this.id = foodModel._id;
    this.label = foodModel.label;
    this.description = foodModel.description
  }
}
