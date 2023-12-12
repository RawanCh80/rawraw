import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from "./services/prisma.service";
import { HttpExceptionFilter } from "./food/httpExceptions/http-exception.filter";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	const prismaService = app.get(PrismaService);
	await prismaService.enableShutdownHooks(app);
	//app.useGlobalFilters(new HttpExceptionFilter());
	await app.listen(3000);
}

bootstrap();
