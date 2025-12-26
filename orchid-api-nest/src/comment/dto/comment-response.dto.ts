import { UserResponseDto } from 'src/users/dto/user-response.dto';

export class CommentResponseDto {
  id: number;
  content: string;
  storyId: number;
  authorId: number;
  createdAt: Date;
  parentCommentId?: number;
  replies: CommentResponseDto[];
  author?: UserResponseDto;
}
