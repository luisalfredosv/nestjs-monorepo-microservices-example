import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CommentSchema } from '../schemas/comment.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentSchema)
    private readonly productRepository: MongoRepository<CommentSchema>,
  ) {}

  async create(comment: CommentSchema) {
    try {
      const newComment = this.productRepository.create(comment);
      return await this.productRepository.save(newComment);
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const findComment = await this.productRepository.findOne({
        where: {
          _id: id,
        },
      });

      if (!findComment) throw new NotFoundException();

      return findComment;
    } catch (error) {
      throw error;
    }
  }
}
