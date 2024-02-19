import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

const PORT = process.env.PORT || 7000

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();

	const swaggerConfig = new DocumentBuilder()
		.setTitle("Yotask")
		.addBearerAuth()
		.setVersion("1.0")
		.build();

	const document = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup("swagger", app, document);

	await app.listen(PORT, "0.0.0.0");
	console.log(`Application is runnning on: ${await app.getUrl()}`);
}

bootstrap();
