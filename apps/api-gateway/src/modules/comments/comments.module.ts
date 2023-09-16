import { Module } from '@nestjs/common';
import { CommentsController } from './controllers/comments.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQQueueNames } from '../../rabbit.constant';
import { CommentsService } from './services/comments.service';

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
      {
        name: 'COMMENTS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: RabbitMQQueueNames.COMMENTS_QUEUE,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
