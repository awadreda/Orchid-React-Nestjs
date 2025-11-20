import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';

@Controller('like')
export class LikeController {
  constructor (private readonly likeService: LikeService) {}

  @Get('getStoryLikesCount/:storyId')
  async getLikesCountForStory (@Param('storyId') storyId: number) {
    return await this.likeService.getLikesCountForStory(storyId);
  }

  @Post('likeStory')
  async likeStory (@Body() createLikeDto: CreateLikeDto) {
    return await this.likeService.likeStory(createLikeDto);
  }

  @Post('unlikeStory/:storyId/:userId')
  async unlikeStory (
    @Param('storyId') storyId: string,
    @Param('userId') userId: string,
  ) {
    const parsedStoryId = parseInt(storyId);
    const parsedUserId = parseInt(userId);

    if (isNaN(parsedStoryId) || isNaN(parsedUserId)) {
      return { message: 'Invalid storyId or userId' };
    }

    return await this.likeService.unlikeStory(parsedStoryId, parsedUserId);
  }
}
