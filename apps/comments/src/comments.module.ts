import { Module, Type } from '@nestjs/common';
import { CommentsController } from './controllers/comments.controller';
import { CommentsService } from './services/comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentSchema } from './schemas/comment.schema';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://root:G4aM4ZLDR4XiiZMw@cluster0.33www2j.mongodb.net',
      database: 'ecommerce',
      entities: [CommentSchema],
      retryWrites: true,
    }),
    TypeOrmModule.forFeature([CommentSchema]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
