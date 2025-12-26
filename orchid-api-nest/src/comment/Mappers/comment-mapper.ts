import { Comment } from '@prisma/client';
import { CommentResponseDto } from '../dto/comment-response.dto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

export class CommentMapper {
  toResponse (
    comment: Comment,
    replies?: Comment[],
    author?: UserResponseDto,
  ): CommentResponseDto {
    return {
      id: comment.id,
      content: comment.content,
      storyId: comment.storyId,
      authorId: comment.authorId,
      createdAt: comment.createdAt,
      parentCommentId: comment.parentCommentId
        ? comment.parentCommentId
        : undefined,
      replies: replies ? replies.map(reply => this.toResponse(reply)) : [],
      author: author ? author : undefined,
    };
  }

  toResponseList (comments: Comment[]): CommentResponseDto[] {
    return comments.map(c => this.toResponse(c));
  }
}
