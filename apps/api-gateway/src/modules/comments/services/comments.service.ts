import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { lastValueFrom } from 'rxjs';
import {
  RabbitMQQueueComments,
  RabbitMQQueueProducts,
} from '@libs/enums/queue-events.enum';
import { ParamsDto } from '@libs/dto/params.dto';

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

  async getAllCommentsByProductId(paramsDto: ParamsDto) {
    try {
      const { id } = paramsDto;
      const checkExistProduct = await lastValueFrom(
        this.productsComments.send(
          RabbitMQQueueProducts.FIND_PRODUCT_BY_ID,
          id,
        ),
      );

      if (!checkExistProduct) throw new NotFoundException(`Product not found`);

      const findComments = await lastValueFrom(
        this.clientsComments.send(
          RabbitMQQueueComments.FIND_ALL_COMMENTS_BY_PRODUCT_ID,
          id,
        ),
      );

      return findComments;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
