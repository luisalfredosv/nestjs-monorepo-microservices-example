import { Body, Controller } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductSchema } from '../schemas/product.schema';
import { RabbitMQQueue } from '../microservice.constant';
import { ObjectId } from 'mongodb';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern(RabbitMQQueue.CREATE_PRODUCTS)
  async create(@Body() product: ProductSchema) {
    return await this.productsService.create(product);
  }

  @MessagePattern(RabbitMQQueue.FIND_ALL_PRODUCTS)
  async findAll() {
    return await this.productsService.findAll();
  }

  @MessagePattern(RabbitMQQueue.FIND_PRODUCT_BY_ID)
  async findOne(@Payload() id: string) {
    return await this.productsService.findOne(id);
  }

  @MessagePattern(RabbitMQQueue.UPDATE_PRODUCT)
  async update(@Payload() payload: string, @Body() product: ProductSchema) {
    return await this.productsService.update(payload, product);
  }

  @MessagePattern(RabbitMQQueue.DELETE_PRODUCT)
  async delete(@Payload() id: string) {
    return await this.productsService.delete(id);
  }
}
