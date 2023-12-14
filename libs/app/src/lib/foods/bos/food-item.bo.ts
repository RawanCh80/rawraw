import { FoodModel } from "../../../index";

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
