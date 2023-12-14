import { FoodForCreationInterface } from "../interfaces/food-for-creation.interface";

export class FoodForCreationDto {
  label: string;
  description: string;

  constructor(foodForCreationFormValue: FoodForCreationInterface) {
    this.label = foodForCreationFormValue.label;
    this.description = foodForCreationFormValue.description;
  }

  toJSON() {
    return {
      label: this.label,
      description: this.description
    }
  }
}
