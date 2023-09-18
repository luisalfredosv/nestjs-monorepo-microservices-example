import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository, ObjectId } from 'typeorm';
import { CommentSchema } from '../schemas/comment.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentSchema)
    private readonly commentsRepository: MongoRepository<CommentSchema>,
  ) {}

  async create(comment: CommentSchema) {
    try {
      const newComment = this.commentsRepository.create(comment);
      return await this.commentsRepository.save(newComment);
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const findComment = await this.commentsRepository.findOne({
        where: {
          _id: new ObjectId(id),
        },
      });

      if (!findComment) throw new NotFoundException();

      return findComment;
    } catch (error) {
      throw error;
    }
  }

  async getAllCommentsByProductId(id: string) {
    try {
      const findComments = await this.commentsRepository.find({
        where: {
          product_id: id,
        },
      });

      return findComments;
    } catch (error) {
      throw error;
    }
  }
}
