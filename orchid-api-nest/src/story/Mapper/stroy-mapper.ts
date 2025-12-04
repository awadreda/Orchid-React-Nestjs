import { Story } from '@prisma/client';
import { StoryResponseDto } from '../dto/story-response.dto';

export class StoryMapper {
  // Convert one Story object to StoryResponseDto
  toStoryResponse (story: Story): StoryResponseDto {
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
    };
  }

  // to story summary dto
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
    return stories.map(story => this.toStoryResponse(story));
  }
}
