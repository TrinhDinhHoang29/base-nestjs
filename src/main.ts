import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { documentFactory } from 'src/configs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerModule.setup('swagger', app, documentFactory(app), {
    jsonDocumentUrl: 'swagger/json',
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      skipMissingProperties: true,
      skipNullProperties: true,
    }),
  );
  const configService = app.get(ConfigService);

  await app.listen(configService.get('server.port') ?? 3000);
}
bootstrap();
