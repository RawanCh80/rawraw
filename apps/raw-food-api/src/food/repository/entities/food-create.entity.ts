import { Prisma } from "@prisma/client";

export class FoodCreateEntity {
	label: string;
	description: string;

	constructor(label: string, description: string) {
		this.label = label;
		this.description = description;
	}

	toDb(): Prisma.FoodCreateInput {
		return {
			label: this.label,
			description: this.description
		}
	}
}
