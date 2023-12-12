import { HttpException, HttpStatus } from "@nestjs/common";

export class FoodDoesntExistsErrorException extends HttpException {
	constructor() {
		super('Food doesnt exists', HttpStatus.NOT_FOUND);
		console.log('Food doesnt exists');
	}
}