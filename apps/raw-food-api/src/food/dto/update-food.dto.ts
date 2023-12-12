import { IsOptional, IsString } from "class-validator";

export class UpdateFoodDto {
	@IsString()
	label: string;

	@IsString()
	@IsOptional()
	description: string;
}
