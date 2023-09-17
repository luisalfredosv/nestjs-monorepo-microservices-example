import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const swaggerConfig = (app: INestApplication, isProduction: boolean) => {
  if (!isProduction) {
    const config = new DocumentBuilder()
      .setTitle('ApiGateway API - Docs')
      .setDescription(
        'Description of the ApiGateway, you can download the collection and import it in Postman',
      )
      .setVersion('0.0.1')
      // .addBearerAuth(
      //   {
      //     description: 'JWT de autenticación',
      //     type: 'http',
      //     in: 'header',
      //     scheme: 'bearer',
      //     bearerFormat: 'JWT',
      //   },
      //    DEFAULT_BEARER_AUTH,  <-- this is the name of the header
      // )
      .setExternalDoc('Download Postman Collection', 'docs-json')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
      customSiteTitle: 'ApiGateway Docs',
    });
  }
};
