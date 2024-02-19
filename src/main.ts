import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { whitelist } from 'validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {whitelist:true,}    // This is used to take only properties decorated with validation decorators and strip any additional properties from incoming objects
  ))
  await app.listen(3000);
}
bootstrap();
