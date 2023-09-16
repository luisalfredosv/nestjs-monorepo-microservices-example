import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiPropertyOptional()
  product_id?: string;

  @ApiProperty()
  text: string;

  @ApiProperty()
  rating: number;

  @ApiPropertyOptional()
  author?: string;
}
