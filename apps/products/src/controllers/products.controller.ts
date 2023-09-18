import { Body, Controller } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductSchema } from '../schemas/product.schema';
import { RabbitMQQueueProducts } from '@libs/enums/queue-events.enum';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern(RabbitMQQueueProducts.CREATE_PRODUCTS)
  async create(@Body() product: ProductSchema) {
    return await this.productsService.create(product);
  }

  @MessagePattern(RabbitMQQueueProducts.FIND_ALL_PRODUCTS)
  async findAll() {
    return await this.productsService.findAll();
  }

  @MessagePattern(RabbitMQQueueProducts.FIND_PRODUCT_BY_ID)
  async findOne(@Payload() id: string) {
    return await this.productsService.findOne(id);
  }

  @MessagePattern(RabbitMQQueueProducts.UPDATE_PRODUCT)
  async update(@Payload() payload: string, @Body() product: ProductSchema) {
    return await this.productsService.update(payload, product);
  }

  @MessagePattern(RabbitMQQueueProducts.DELETE_PRODUCT)
  async delete(@Payload() id: string) {
    return await this.productsService.delete(id);
  }
}
