import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateFoodDto } from "./dto/create-food.dto";
import { FoodDao } from "./repository/dao/food.dao";
import { UpdateFoodDto } from "./dto/update-food.dto";
import { FoodRepository } from "./repository/food.repository";
import { FoodItemDto } from "./dto/food-item.dto";
import { FoodItemModel } from "./repository/models/food-item.model";
import { FoodAlreadyExistsErrorException } from "./httpExceptions/food-already-exists-error-exception";
import { FoodDoesntExistsErrorException } from "./httpExceptions/food-doesnt-exists-error-exception";
import { FoodLabelAlreadyExistsErrorException } from "./httpExceptions/food-label-already-exists-error-exception";
import { Prisma } from "@prisma/client";
import { dbErrorsCodes } from "./repository/db-errors-codes";

@Injectable()
export class FoodService {
	constructor(private foodRepository: FoodRepository) {
	}

	public async findFoodById(foodId: string) {
		try {
			const foodDao = new FoodDao(foodId);
			const foundFood = await foodDao.findById();
			if (!foundFood) {
				throw new FoodDoesntExistsErrorException();
			}
			return foundFood;
		} catch (error: any) {
			if (error instanceof HttpException) {
				throw error;
			}
			throw new InternalServerErrorException(error);
		}
	}

	public async getAllFood(): Promise<FoodItemDto[]> {
		try {
			const foodModels = await this.foodRepository.getAllFood();
			return foodModels.map((foodModel: FoodItemModel) => new FoodItemDto(foodModel));
		} catch (err) {
			throw new InternalServerErrorException(err);
		}
	}

	public async createFood(createFoodDto: CreateFoodDto) {
		try {
			const foodDao = new FoodDao(null, createFoodDto);
			const foundFood = await foodDao.findByLabel();
			if (foundFood) {
				throw new FoodAlreadyExistsErrorException();
			}
			return foodDao.create();
		} catch (error: any) {
			if (error instanceof HttpException) {
				throw error;
			}
			throw new InternalServerErrorException(error);
		}
	}

	public async updateFood(foodId: string, updateFoodDto: UpdateFoodDto) {
		try {
			const foodDao = new FoodDao(foodId, updateFoodDto);
			const foundFoodById = await this.findFoodById(foodId);
			const foundFoodByLabel = await foodDao.findByLabel();
			const isSameFoodLabel = foundFoodByLabel.id === foodId;
			if (!foundFoodById) {
				throw new FoodDoesntExistsErrorException();
			}
			if (foundFoodByLabel && !isSameFoodLabel) {
				throw new FoodLabelAlreadyExistsErrorException();
			}
			return foodDao.save();
		} catch (error: any) {
			if (error instanceof HttpException) {
				throw error ;
			}
			throw new InternalServerErrorException(error);
		}
	}

	public async deleteFood(foodId: string) {
		try {
			const foodDao = new FoodDao(foodId);
			return await foodDao.remove();
		} catch (error: any) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				if (error.code === dbErrorsCodes.recordNotFound) {
					throw new FoodDoesntExistsErrorException();
				}
			}
			throw new error();
		}
	}

}
