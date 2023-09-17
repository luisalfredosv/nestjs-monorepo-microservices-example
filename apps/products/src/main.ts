import { NestFactory } from '@nestjs/core';
import { ProductsModule } from './products.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RABBIT_MQ_QUEUE } from './microservice.constant';
import { HttpToRpcExceptionFilter } from '@libs/filters/http-to-rpc-exception.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const configService = new ConfigService();
  const msgTransporterURI = configService.get<string>('TRANSPORT_QUEUE_URI');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProductsModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [msgTransporterURI],
        queue: RABBIT_MQ_QUEUE,
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  app.useGlobalFilters(new HttpToRpcExceptionFilter());
  await app.listen();
}
bootstrap();
