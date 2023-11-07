import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiProperty()
  text: string;

  @ApiProperty()
  rating: number;
}
