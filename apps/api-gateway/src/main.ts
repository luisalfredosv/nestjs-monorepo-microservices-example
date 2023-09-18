import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { CustomRpcExceptionFilter } from './common/filters/rpc-exception.filter';
import { ConfigService } from '@nestjs/config';
import { swaggerConfig } from './config/swagger.config';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(ApiGatewayModule, {
    abortOnError: false,
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);

  const port = configService.get<number>('API_GATEWAY_PORT');
  const isProduction = configService.get<string>('NODE_ENV') === 'production';

  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useGlobalFilters(new CustomRpcExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  swaggerConfig(app, isProduction);

  await app.listen(port);
  logger.log(`Started on port ${port}`, `API Gateway`);
}
bootstrap();
