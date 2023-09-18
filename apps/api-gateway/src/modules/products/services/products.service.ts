import { RabbitMQQueueProducts } from '@libs/enums/queue-events.enum';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from '../dto/create-product.dto';
import { ParamsDto } from '@libs/dto/params.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_SERVICE') private clientProducts: ClientProxy,
  ) {}

  async getProducts() {
    try {
      return this.clientProducts.send(
        RabbitMQQueueProducts.FIND_ALL_PRODUCTS,
        '',
      );
    } catch (error) {
      throw error;
    }
  }

  async getProductById(paramsDto: ParamsDto) {
    try {
      const findProduct = await lastValueFrom(
        this.clientProducts.send(
          RabbitMQQueueProducts.FIND_PRODUCT_BY_ID,
          paramsDto,
        ),
      );

      if (!findProduct) throw new NotFoundException('Product not found');

      return findProduct;
    } catch (error) {
      throw error;
    }
  }

  async createProduct(createProductDto: CreateProductDto) {
    try {
      return this.clientProducts.send(
        RabbitMQQueueProducts.CREATE_PRODUCTS,
        createProductDto,
      );
    } catch (error) {
      throw error;
    }
  }
}
