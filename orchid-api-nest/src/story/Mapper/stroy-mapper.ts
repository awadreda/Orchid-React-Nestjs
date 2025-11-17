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
      content: story.content ||'',
      published: story.published,
      viewCount: story.viewCount,
      authorId: story.authorId  || undefined ,
    };
  }

  // Convert array -> list of StoryResponseDto
  toStoryResponseList (stories: Story[]): StoryResponseDto[] {
    return stories.map(story => this.toStoryResponse(story));
  }
}
