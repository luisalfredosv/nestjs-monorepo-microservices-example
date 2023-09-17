import { Module } from '@nestjs/common';
import { CommentsController } from './controllers/comments.controller';
import { CommentsService } from './services/comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentSchema } from './schemas/comment.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get<string>('DB_URI'),
        database: configService.get<string>('DB_NAME'),
        entities: [CommentSchema],
        retryWrites: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([CommentSchema]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
