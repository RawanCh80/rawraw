import { Module } from '@nestjs/common';
import { FoodController } from "./food.controller";
import { FoodService } from "./food.service";
import { FoodRepository } from "./repository/food.repository";
import { PrismaService } from "../services/prisma.service";

@Module({
	imports: [],
	controllers: [FoodController],
	providers: [FoodService, FoodRepository, PrismaService],
})
export class FoodModule {
}
