import { Body, Controller } from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { RabbitMQQueueComments } from '@libs/enums/queue-events.enum';
import { CommentSchema } from '../schemas/comment.schema';

@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @MessagePattern(RabbitMQQueueComments.CREATE_COMMENTS)
  async create(@Body() data: CommentSchema) {
    return await this.commentsService.create(data);
  }

  @EventPattern(RabbitMQQueueComments.FIND_COMMENT_BY_ID)
  async findById(@Payload() id: string) {
    return await this.commentsService.findById(id);
  }

  @EventPattern(RabbitMQQueueComments.FIND_ALL_COMMENTS_BY_PRODUCT_ID)
  async getAllCommentsByProductId(@Payload() id: string) {
    return await this.commentsService.getAllCommentsByProductId(id);
  }
}
