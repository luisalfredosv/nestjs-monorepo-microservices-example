import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQQueueNames } from '@libs/enums/queue-microservices.enum';
import { ProductsService } from './services/products.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCTS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: RabbitMQQueueNames.PRODUCTS_QUEUE,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
