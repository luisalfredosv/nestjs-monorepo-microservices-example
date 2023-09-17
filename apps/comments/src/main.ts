import { NestFactory } from '@nestjs/core';
import { CommentsModule } from './comments.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const configService = new ConfigService();
  const msgTransporterURI = configService.get<string>('TRANSPORT_QUEUE_URI');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CommentsModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [msgTransporterURI],
        queue: 'comments_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen();
}
bootstrap();
