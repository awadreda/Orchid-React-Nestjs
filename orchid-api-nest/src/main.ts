import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { apiReference } from '@scalar/nestjs-api-reference';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);


 // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  app.use(
  '/reference', // the path where the API reference will be available
  apiReference({
    content: document, // your Swagger/OpenAPI document
  }),
);

app.use(
  '/reference',
  apiReference({
    url: '/openapi.json', // serve your swagger.json at this path
  }),
);


  await app.listen(process.env.PORT ?? 3000);
}
// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
