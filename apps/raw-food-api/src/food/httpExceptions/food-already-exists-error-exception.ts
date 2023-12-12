import { HttpException, HttpStatus } from "@nestjs/common";

export class FoodAlreadyExistsErrorException extends HttpException {
	constructor() {
		super('Food already exists', HttpStatus.CONFLICT);
	}
}