import { FoodForCreationInterface } from "apps/raw-food-mobile/src/app/food-list/food-create-modal/food-create.modal";

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
