import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class ParamsDto {
  @ApiProperty({ required: true })
  @IsMongoId()
  id: string;
}
