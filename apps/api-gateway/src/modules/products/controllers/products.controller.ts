import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductsService } from '../services/products.service';
import { ApiTags } from '@nestjs/swagger';
import { ParamsDto } from '@libs/dto/params.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts() {
    return await this.productsService.getProducts();
  }

  @Get(':id')
  async getProductById(@Param() paramsDto: ParamsDto) {
    return await this.productsService.getProductById(paramsDto);
  }

  @Post()
  async createProduct(@Body() body: CreateProductDto) {
    return this.productsService.createProduct(body);
  }
}
