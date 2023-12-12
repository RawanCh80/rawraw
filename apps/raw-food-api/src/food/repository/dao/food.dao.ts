import { PrismaService } from "../../../services/prisma.service";
import { Prisma } from "@prisma/client";
import { FoodCreateEntity } from "../entities/food-create.entity";
import { FoodUpdateEntity } from "../entities/food-update.entity";
import { FoodModel } from "../models/food.model";

export class FoodDao {
	private prisma: PrismaService = new PrismaService();
	private foodId: string;
	private _label: string;
	private _description: string;

	constructor(foodId?: string,
	            food?: Prisma.FoodCreateInput | Prisma.FoodUpdateInput
	) {
		this.foodId = foodId;
		if (food) {
			this._label = food.label as string;
			this._description = food.description as string;
		}
	}

	public findById(): Promise<FoodModel> {
		return this.prisma.food.findFirst({
			where: {
				id: this.foodId
			},
		})
	}

	public findByLabel(): Promise<FoodModel> {
		return this.prisma.food.findFirst({
			where: {
				label: this.label
			},
		})
	}

	public create(): Promise<FoodModel> {
		const foodCreateEntity = new FoodCreateEntity(this.label, this.description);
		return this.prisma.food.create({
			data: foodCreateEntity.toDb()
		});
	}

	public save(): Promise<FoodModel> {
		const foodUpdateEntity = new FoodUpdateEntity(this.label, this.description);
		return this.prisma.food.update({
			where: {
				id: this.foodId
			},
			data: foodUpdateEntity.toDb(),
		})
	}

	public remove(): Promise<FoodModel> {
		return this.prisma.food.delete({
			where: {
				id: this.foodId
			},
		});
	}

	get label(): string {
		return this._label;
	}

	set label(value: string) {
		this._label = value;
	}

	get description(): string {
		return this._description;
	}

	set description(value: string) {
		this._description = value;
	}
}
