import { HttpException, HttpStatus } from "@nestjs/common";

export class FoodLabelAlreadyExistsErrorException extends HttpException {
	constructor() {
		super('Food already exists', HttpStatus.CONFLICT);
	}
}