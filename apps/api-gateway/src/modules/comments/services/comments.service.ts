import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { lastValueFrom } from 'rxjs';
import {
  RabbitMQQueueComments,
  RabbitMQQueueProducts,
} from '@apps/api-gateway/src/rabbit.constant';

@Injectable()
export class CommentsService {
  constructor(
    @Inject('COMMENTS_SERVICE') private clientsComments: ClientProxy,
    @Inject('PRODUCTS_SERVICE') private productsComments: ClientProxy,
  ) {}

  async createComment(createCommentDto: CreateCommentDto) {
    try {
      const { product_id } = createCommentDto;
      const checkExistProduct = await lastValueFrom(
        this.productsComments.send(
          RabbitMQQueueProducts.FIND_PRODUCT_BY_ID,
          product_id,
        ),
      );

      if (!checkExistProduct) throw new NotFoundException(`Product not found`);

      return this.clientsComments.send(
        RabbitMQQueueComments.CREATE_COMMENTS,
        createCommentDto,
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
