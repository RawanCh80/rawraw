import { FoodItemModel } from "../repository/models/food-item.model";

export class FoodItemDto {
	_id: string;
	label: string;
	description: string;

	constructor(foodItemModel: FoodItemModel) {
		this._id = foodItemModel.id;
		this.label = foodItemModel.label;
		this.description = foodItemModel.description;
	}
}
