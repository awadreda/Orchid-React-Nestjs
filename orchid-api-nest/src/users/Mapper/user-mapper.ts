import { User } from '@prisma/client';
import { UserDashboardDto, UserResponseDto } from '../dto/user-response.dto';
import { CommentResponseDto } from 'src/comment/dto/comment-response.dto';
import { LikeResponseDto } from 'src/like/dto/LikeResponseDto';
import { StoryResponseDto } from 'src/story/dto/story-response.dto';

export class UserMapper {
  toResponseDto (
    user: User,
    comments: CommentResponseDto[],
    likes: LikeResponseDto[],
    stories: StoryResponseDto[],
  ): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name || '',
      emailVerified: user.emailVerified || undefined,

      image: user.image || '',
      role: user.role,
      createdAt: user.createdAt,
      comments: comments || [],
      likes: likes || [],
      stories: stories || [],
    };
  }

  toSampleResponse (user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name || '',
      emailVerified: user.emailVerified || undefined,

      image: user.image || '',
      role: user.role,
      createdAt: user.createdAt,
      comments: [],
      likes: [],
      stories: [],
    };
  }

  toUserDashboardDto (
    user: User,
    storiesCount: number,
    commentCount: number,
  ): UserDashboardDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name || '',
      role: user.role,
      createdAt: user.createdAt,
      storiesCount: storiesCount,
      commentsCount: commentCount,
    };
  }

  // toResponseList (users: User[]): UserResponseDto[] {
  //   return users.map(u => this.toResponseDto(u));
  // }
}
