import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateLikeDto {
  @IsInt()
  @ApiProperty({ type: Number })
  storyId: number;

  @IsInt()
  @ApiProperty({ type: Number })
  userId: number;
}
