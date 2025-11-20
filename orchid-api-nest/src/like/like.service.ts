import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { LikeMapper } from './Mappers/like-mapper';

@Injectable()
export class LikeService {
  constructor (private readonly _prisma: PrismaService) {}

  likeMapper = new LikeMapper();

  async getLikesCountForStory (storyId: number) {
    const count = await this._prisma.like.count({
      where: { storyId: storyId },
    });
    return {
      storyId: storyId,
       likesCount: count
     };
  }

  async islikedByUser (storyId: number, userId: number) {
    const count = await this._prisma.like.count({
      where: { storyId: storyId, userId: userId },
    });
    return count > 0;
  }

  async likeStory (createLikeDto: CreateLikeDto) {
    if (await this.islikedByUser(createLikeDto.storyId, createLikeDto.userId)) {
      return { message: 'Like already exists' };
    }

    const like = await this._prisma.like.create({
      data: {
        storyId: createLikeDto.storyId,
        userId: createLikeDto.userId,
      },
    });

    return this.likeMapper.toResponse(like);
  }

  async unlikeStory (storyId: number, userId: number) {
    const deletedLike = await this._prisma.like.deleteMany({
      where: {
        storyId: storyId,
        userId: userId,
      },
    });

    if (deletedLike.count > 0) {
      return { message: 'Like deleted successfully' };
    } else {
      return { message: 'Like not found' };
    }
  }
}
