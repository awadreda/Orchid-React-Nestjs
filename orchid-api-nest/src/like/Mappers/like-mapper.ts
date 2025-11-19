import { Like } from '@prisma/client';
import { LikeResponseDto } from '../dto/LikeResponseDto';

export class LikeMapper {
  toResponse (like: Like): LikeResponseDto {
    return {
      id: like.id,
      storyId: like.storyId,
      userId: like.userId,
      createdAt: like.createdAt,
    };
  }

  toResponseList (likes: Like[]): LikeResponseDto[] {
    return likes.map(l => this.toResponse(l));
  }
}
