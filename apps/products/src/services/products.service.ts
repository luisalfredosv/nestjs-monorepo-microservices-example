import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { ProductSchema } from '../schemas/product.schema';
import { ObjectId } from 'mongodb';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductSchema)
    private readonly productRepository: MongoRepository<ProductSchema>,
  ) {}

  async create(product: ProductSchema) {
    try {
      const newtProduct = this.productRepository.create(product);
      return await this.productRepository.save(newtProduct);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.productRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.productRepository.findOne({
        where: {
          _id: new ObjectId(id),
        },
      });

      if (!product) throw new NotFoundException(`Producto no encontrado`);

      return product;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, product: ProductSchema) {
    try {
      const findProduct = await this.productRepository.findOne({
        where: {
          _id: id,
        },
      });

      if (!findProduct) throw new NotFoundException();

      return await this.productRepository.updateOne(
        {
          _id: findProduct._id,
        },
        {
          product,
        },
      );
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const findProduct = await this.productRepository.findOne({
        where: {
          _id: id,
        },
      });

      if (!findProduct) throw new NotFoundException();

      return await this.productRepository.deleteOne({
        _id: findProduct._id,
      });
    } catch (error) {
      throw error;
    }
  }
}
