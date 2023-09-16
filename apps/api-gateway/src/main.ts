import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { CustomRpcExceptionFilter } from './filters/rpc-exception.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(ApiGatewayModule);

  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalFilters(new CustomRpcExceptionFilter());

  const opts = new DocumentBuilder()
    .setTitle('SuperFlight API')
    .setDescription('Scheduled Flights App')
    .setVersion('2.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, opts);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      filter: true,
    },
  });

  await app.listen(3000);
}
bootstrap();
