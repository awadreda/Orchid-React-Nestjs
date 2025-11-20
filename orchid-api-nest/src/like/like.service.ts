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
    return count;
  }


  

  async likeStory (createLikeDto: CreateLikeDto) {
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
