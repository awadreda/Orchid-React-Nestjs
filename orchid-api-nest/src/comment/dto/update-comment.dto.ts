import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateCommentDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @ApiProperty({type: String, description: 'Updated content of the comment', required: false})
  content?: string;
}
