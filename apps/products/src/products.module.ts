import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ProductSchema } from './schemas/product.schema';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://root:G4aM4ZLDR4XiiZMw@cluster0.33www2j.mongodb.net',
      database: 'ecommerce',
      entities: [ProductSchema],
      retryWrites: true,
    }),
    TypeOrmModule.forFeature([ProductSchema]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
