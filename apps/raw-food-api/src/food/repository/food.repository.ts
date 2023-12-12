import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../services/prisma.service";
import { FoodItemModel } from "./models/food-item.model";

@Injectable()
export class FoodRepository {
	constructor(private prismaService: PrismaService) {
	}

	public getAllFood(): Promise<FoodItemModel[]> {
		return this.prismaService
			.food
			.findMany({
				select: {
					id: true,
					label: true,
					description: true
				}
			});
	}
}
