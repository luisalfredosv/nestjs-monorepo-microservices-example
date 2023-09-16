import { Body, Controller } from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { RabbitMQQueue } from '../microservice.constant';
import { CommentSchema } from '../schemas/comment.schema';

@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @MessagePattern(RabbitMQQueue.CREATE_COMMENTS)
  async create(@Body() data: CommentSchema) {
    return await this.commentsService.create(data);
  }

  @EventPattern(RabbitMQQueue.FIND_COMMENT_BY_ID)
  async findById(@Payload() id: string) {
    return await this.commentsService.findById(id);
  }
}
