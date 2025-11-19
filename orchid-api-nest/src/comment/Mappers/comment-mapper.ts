import { Comment } from '@prisma/client';
import { CommentResponseDto } from '../dto/comment-response.dto';

export class CommentMapper {
  toResponse (comment: Comment): CommentResponseDto {
    return {
      id: comment.id,
      content: comment.content,
      storyId: comment.storyId,
      authorId: comment.authorId,
      createdAt: comment.createdAt,
    };
  }

  toResponseList (comments: Comment[]): CommentResponseDto[] {
    return comments.map(c => this.toResponse(c));
  }
}
