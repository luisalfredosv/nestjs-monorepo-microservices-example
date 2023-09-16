import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [ProductsModule, CommentsModule],
  controllers: [],
})
export class ModulesModule {}
