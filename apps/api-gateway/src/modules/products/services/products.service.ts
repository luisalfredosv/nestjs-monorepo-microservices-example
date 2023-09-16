import { RabbitMQQueueProducts } from '@apps/api-gateway/src/rabbit.constant';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_SERVICE') private clientProducts: ClientProxy,
  ) {}

  async getProducts() {
    return this.clientProducts.send(
      RabbitMQQueueProducts.FIND_ALL_PRODUCTS,
      '',
    );
  }
  async createProduct(createProductDto: CreateProductDto) {
    return this.clientProducts.send(
      RabbitMQQueueProducts.CREATE_PRODUCTS,
      createProductDto,
    );
  }
}
