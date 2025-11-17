import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { StoryService } from './story.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { StoryResponseDto } from './dto/story-response.dto';

@Controller('story')
export class StoryController {
  constructor (private readonly storyService: StoryService) {}

  @Get('allstories')
  async getAllStories (): Promise<StoryResponseDto[] | { message: string }> {
    const stories = await this.storyService.getAllStories();

    if (stories.length === 0) {
      return { message: 'No stories found' };
    }
    return stories;
  }

  @Get('storybyid/:id')
  async getStoryById (
    @Param('id') id: string,
  ): Promise<StoryResponseDto | { message: string }> {
    if (isNaN(parseInt(id))) {
      return { message: 'Invalid story ID' };
    }

    const idNum = parseInt(id);
    const story = await this.storyService.getStoryById(idNum);

    if (!story) {
      return { message: 'Story not found' };
    }

    return story;
  }

  @Post('createstory')
  async createStory (
    @Body() createStoryDto: CreateStoryDto,
  ): Promise<StoryResponseDto | { message: string }> {

    
    
    const story = await this.storyService.createStory(createStoryDto);

    if (!story) {
      throw new Error('Story creation failed');
    }

    return story;
  }

  @Put('updatestory/:id')
  async UpdateStory (
    @Param('id') id: string,
    @Body() updateStoryDto: UpdateStoryDto,
  ): Promise<StoryResponseDto | { message: string }> {
    if (isNaN(parseInt(id))) {
      return { message: 'Invalid story ID' };
    }
    const idNum = parseInt(id);

    const story = await this.storyService.updateStory(idNum, updateStoryDto);

    if (!story) {
      return { message: 'Story not found' };
    }
    return story;
  }

  @Delete('deletestory/:id')
  async deleteStory (@Param('id') id: string): Promise<{ message: string }> {
    if (isNaN(parseInt(id))) {
      return { message: 'Invalid story ID' };
    }

    const idNum = parseInt(id);
    const result = await this.storyService.deleteStory(idNum);

    return result;
  }
}
