import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const swaggerConfig = new DocumentBuilder()
	.setTitle('Yotask')
	.setVersion('1.0')
	.build()

	const document = SwaggerModule.createDocument(app, swaggerConfig)
	SwaggerModule.setup('swagger', app, document)

	await app.listen(8000, '0.0.0.0');
	console.log(`Application is runnning on: ${await app.getUrl()}`);
}
bootstrap();
