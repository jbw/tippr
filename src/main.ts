import * as helmet from "helmet";

import {
  INestApplication,
  Logger,
  ValidationPipe,
  VersioningType
} from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";
import { loggerMiddleware } from "./infrastructure/middleware/logger.middleware";

async function SetupSwagger(app: INestApplication) {

  const config = new DocumentBuilder()
    .setTitle('Tips API')
    .setDescription('Tips API')
    .setVersion('1.0')
    .addBearerAuth({ type: 'apiKey', in: 'header', name: 'Authorization'})
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(helmet());

  app.use(loggerMiddleware);

  app.enableCors();

  await SetupSwagger(app);

  const PORT = process.env.PORT || 3000;
  Logger.log('Setting port: ' + PORT, 'info');

  await app.listen(3000);
}

bootstrap();
