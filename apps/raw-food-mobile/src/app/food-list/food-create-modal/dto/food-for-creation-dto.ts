import { FoodForCreationInterface } from "../food-create.modal";

export class FoodForCreationDto {
  label: string;
  description: string;

  constructor(foodForCreationFormValue:FoodForCreationInterface) {
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
