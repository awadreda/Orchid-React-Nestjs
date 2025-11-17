import { Injectable } from '@nestjs/common';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { StoryMapper } from './Mapper/stroy-mapper';
import { StoryResponseDto } from './dto/story-response.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class StoryService {
  constructor (
    private readonly _prisma: PrismaService,
    private readonly _userService: UsersService,
  ) {}

  private storyMapper = new StoryMapper();

  // -----------------------------
  // Get All Stories
  // -----------------------------
  async getAllStories (): Promise<StoryResponseDto[]> {
    try {
      const stories = await this._prisma.story.findMany({
        orderBy: { createdAt: 'desc' },
      });

      return this.storyMapper.toStoryResponseList(stories);
    } catch (error) {
      console.error('Error fetching stories:', error);
      throw error;
    }
  }

  // -----------------------------
  // Get Story By ID
  // -----------------------------
  async getStoryById (id: number): Promise<StoryResponseDto | null> {
    try {
      const story = await this._prisma.story.findUnique({
        where: { id },
      });

      if (!story) {
        return null;
      }

      return this.storyMapper.toStoryResponse(story);
    } catch (error) {
      console.error('Error fetching story by ID:', error);
      throw error;
    }
  }

  // -----------------------------
  // Check if Story Exists
  // -----------------------------
  async isStoryExist (id: number): Promise<boolean> {
    const story = await this._prisma.story.findUnique({
      where: { id },
    });

    return story ? true : false;
  }

  // -----------------------------
  // Create Story
  // -----------------------------
  async createStory (dto: CreateStoryDto): Promise<StoryResponseDto | {message:string}> {
    try {
      if (!await this._userService.isUserExist(dto.authorId))
        return {message:' the author not found'}
      const story = await this._prisma.story.create({
        data: {
          title: dto.title,
          content: dto.content,
          published: dto.published ?? false,
          authorId: dto.authorId ?? null,
          createdAt: new Date(),
        },
      });

      return this.storyMapper.toStoryResponse(story);
    } catch (error) {
      console.error('Error creating story:', error);
      throw error;
    }
  }

  // -----------------------------
  // Update Story
  // -----------------------------
  async updateStory (
    id: number,
    dto: UpdateStoryDto,
  ): Promise<StoryResponseDto | null> {
    try {
      // لو مش موجود
      if (!(await this.isStoryExist(id))) {
        return null;
      }

      const updated = await this._prisma.story.update({
        where: { id },
        data: {
          title: dto.title,
          content: dto.content,
          published: dto.published,
          authorId: dto.authorId,
        },
      });

      return this.storyMapper.toStoryResponse(updated);
    } catch (error) {
      console.error('Error updating story:', error);
      throw error;
    }
  }

  // -----------------------------
  // Delete Story
  // -----------------------------
  async deleteStory (id: number): Promise<{ message: string }> {
    try {
      if (!(await this.isStoryExist(id))) {
        return { message: 'Story not found' };
      }

      await this._prisma.story.delete({
        where: { id },
      });

      return { message: 'Story deleted successfully' };
    } catch (error) {
      console.error('Error deleting story:', error);
      throw error;
    }
  }
}
