import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

export class CommentResponseDto {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  content: string;

  @ApiProperty({ type: Number })
  storyId: number;

  @ApiProperty({ type: Number })
  authorId: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Number })
  parentCommentId?: number;

  @ApiProperty({ type: () => [CommentResponseDto] })
  replies: CommentResponseDto[];

  @ApiProperty({ type: () => UserResponseDto })
  author?: UserResponseDto;
}
