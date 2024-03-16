import { Module, ValidationPipe } from '@nestjs/common';
import { FoodModule } from "./food/food.module";
import { APP_PIPE } from "@nestjs/core";

@Module({
	imports: [FoodModule],
	providers: [{
		provide: APP_PIPE,
		useClass: ValidationPipe
	}]
})
export class AppModule {
}
