import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters } from '@nestjs/common';
import { FoodService } from "./food.service";
import { CreateFoodDto } from "./dto/create-food.dto";
import { UpdateFoodDto } from "./dto/update-food.dto";
import { FoodItemDto } from "./dto/food-item.dto";
import { HttpExceptionFilter } from "./httpExceptions/http-exception.filter";

@Controller('foods')
@UseFilters(HttpExceptionFilter)
export class FoodController {
	constructor(private foodService: FoodService) {
	}

	@Get()
	getAllFood(): Promise<FoodItemDto[]> {
		return this.foodService.getAllFood();
	}

	@Get(':foodId')
	getFood(@Param('foodId') foodId: string) {
		return this.foodService.findFoodById(foodId);
	}

	@Post()
	async createFood(@Body() createFoodDto: CreateFoodDto) {
		return this.foodService.createFood(createFoodDto);
	}

	@Put(':foodId')
	update(@Param('foodId') foodId: string,
	       @Body() updateFoodDto: UpdateFoodDto) {
		return this.foodService.updateFood(foodId, updateFoodDto);
	}

	@Delete(':foodId')
	remove(@Param('foodId') foodId: string) {
		return this.foodService.deleteFood(foodId);
	}
}
