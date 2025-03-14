import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const documentFactory = (app) => {
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  return SwaggerModule.createDocument(app, config);
};
