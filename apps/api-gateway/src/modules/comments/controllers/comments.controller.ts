import { Body, Controller, Post } from '@nestjs/common';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentsService } from '../services/comments.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async createComment(@Body() body: CreateCommentDto) {
    return await this.commentsService.createComment(body);
  }
}
