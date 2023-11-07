import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { CommentsService } from '../services/comments.service';
import { ApiTags } from '@nestjs/swagger';
import { ParamsDto } from '@libs/dto/params.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async createComment(@Body() body: CreateCommentDto) {
    return await this.commentsService.createComment(body);
  }

  @Get('product/:id')
  async getAllCommentsByProductId(@Param() paramsDto: ParamsDto) {
    return await this.commentsService.getAllCommentsByProductId(paramsDto);
  }

  @Patch(':id')
  async updateComment(
    @Param() paramsDto: ParamsDto,
    @Body() body: UpdateCommentDto,
  ) {
    return await this.commentsService.updateComment(paramsDto, body);
  }

  @Delete(':id')
  async deleteComment(@Param() paramsDto: ParamsDto) {
    return await this.commentsService.deleteComment(paramsDto);
  }
}
