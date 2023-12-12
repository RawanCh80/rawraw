import { Prisma } from "@prisma/client";

export class FoodUpdateEntity {
	label: string;
	description: string;

	constructor(label: string, description: string) {
		this.label = label;
		this.description = description;
	}

	toDb(): Prisma.FoodUpdateInput {
		return {
			label: this.label,
			description: this.description
		}
	}
}
