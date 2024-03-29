import { FoodForUpdateInterface } from "../interfaces/food-for-updated.interface";


export class FoodForUpdatedDto{
  label : string;
  description : string;

  constructor(foodFormDetailsValue:FoodForUpdateInterface) {
    this.label=foodFormDetailsValue.label;
    this.description=foodFormDetailsValue.description;
  }
  toJSON(){
    return {
      label : this.label,
      description : this.description
    }
  }
}
