import { FoodDoesntExistsErrorException } from "./food-doesnt-exists-error-exception";
import { FoodAlreadyExistsErrorException } from "./food-already-exists-error-exception";
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { FoodLabelAlreadyExistsErrorException } from "./food-label-already-exists-error-exception";

@Catch(
	FoodAlreadyExistsErrorException,
	FoodDoesntExistsErrorException,
	FoodLabelAlreadyExistsErrorException
)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const status =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		response
			.status(status)
			.json({
				statusCode: status,
				message: exception.message || 'Internal Server Error',
			});
	}
}