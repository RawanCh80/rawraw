import { IsString } from "class-validator";

export class CreateFoodDto {
	@IsString()
	label: string;

	@IsString()
	description: string;
}