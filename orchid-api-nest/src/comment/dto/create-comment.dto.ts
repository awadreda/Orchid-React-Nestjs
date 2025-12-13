import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty({ type: String, description: 'Content of the comment' })
  content: string;

  @ApiProperty({
    type: Number,
    description: 'ID of the story being commented on',
  })
  @IsInt()
  storyId: number;

  @ApiProperty({ type: Number, description: 'ID of the author of the comment' })
  @IsInt()
  authorId: number;

  @ApiProperty({ type: String, description: 'Username of the author' })
  @IsString()
  username: string;
}
