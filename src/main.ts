import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from "dotenv";
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    stopAtFirstError: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }));

  await app.listen(parseInt(process.env.PORT));
  console.log("🚀 ~ bootstrap ~ parseInt(process.env.PORT):", parseInt(process.env.PORT))
}
bootstrap();
