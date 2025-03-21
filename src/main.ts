import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { documentFactory } from 'src/configs/swagger.config';
import { ValidationTransformPipe } from 'src/pipes/validation.pipe';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    prefix: 'api/v',
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  SwaggerModule.setup('swagger', app, documentFactory(app), {
    jsonDocumentUrl: 'swagger/json',
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  app.useGlobalPipes(ValidationTransformPipe);
  const configService = app.get(ConfigService);

  await app.listen(configService.get('server.port') ?? 3000);
}
bootstrap();
