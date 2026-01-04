import { Story } from '@prisma/client';
import { StoryResponseDto } from '../dto/story-response.dto';
import { CommentResponseDto } from 'src/comment/dto/comment-response.dto';
import { LikeResponseDto } from 'src/like/dto/LikeResponseDto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { response } from 'express';

export class StoryMapper {
  // Convert one Story object to StoryResponseDto
  toStoryResponse (
    story: Story,
    comments: CommentResponseDto[] = [],
    likes: LikeResponseDto[] = [],
    author: UserResponseDto | null = null,
  ): StoryResponseDto {
    return {
      id: story.id,
      createdAt: story.createdAt,
      updatedAt: story.updatedAt,
      title: story.title,
      content: story.content || '',
      thumbnailUrl: story.thumbnailUrl || '',
      published: story.published,
      viewCount: story.viewCount,
      authorId: story.authorId || undefined,
      caption: story.caption || '',
      // الجديد:
      author: author ? author : undefined,
      likes: likes,
      comments: comments,
    };
  }

  // to story summary dto
  toStorySummaryDto (story: Story, likesCount: number, commentsCount: number) {
    return {
      id: story.id,
      title: story.title,
      caption: story.content ? story.content.substring(0, 100) + '...' : '',
      thumbnailUrl: story.thumbnailUrl || '',
      published: story.published,
      viewCount: story.viewCount,
      createdAt: story.createdAt,
      updatedAt: story.updatedAt,
      authorId: story.authorId || undefined,

      // الجديد:
      likesCount: likesCount,
      commentsCount: commentsCount,
    };
  }

  // toStorySummaryDtoList (
  //   stories: Story[],
  //   likes: Like[][],
  //   comments: Comment[][],
  // ) {
  //   return stories.map((story, index) =>
  //     this.toStorySummaryDto(story, likes[index], comments[index]),
  //   );
  // }

  // Convert array -> list of StoryResponseDto
  toStoryResponseList (stories: Story[]): StoryResponseDto[] {
    return stories.map(story => this.toStoryResponse(story, [], [], null));
  }
}
