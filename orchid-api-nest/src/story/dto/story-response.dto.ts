import { ApiProperty } from '@nestjs/swagger';
import { Like } from '@prisma/client';
import { CommentResponseDto } from 'src/comment/dto/comment-response.dto';
import { LikeResponseDto } from 'src/like/dto/LikeResponseDto';

export class StoryResponseDto {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  title: string;
  @ApiProperty({ type: String })
  caption?: string;
  @ApiProperty({ type: String })
  content?: string;
  @ApiProperty({ type: String })
  thumbnailUrl?: string;
  @ApiProperty({ type: Boolean })
  published: boolean;
  @ApiProperty({ type: Number })
  viewCount: number;
  @ApiProperty({ type: Date })
  createdAt: Date;
  @ApiProperty({ type: Date })
  updatedAt: Date;
  @ApiProperty({ type: Number })
  authorId?: number;
  @ApiProperty({ type: () => [LikeResponseDto] })
  likes?: LikeResponseDto[];
  @ApiProperty({ type: () => [CommentResponseDto] })
  comments?: CommentResponseDto[];
}

export class storySummryDto {
  @ApiProperty({ type: Number })
  id: number;
  @ApiProperty({ type: String })
  title: string;
  @ApiProperty({ type: String })
  caption?: string;
  @ApiProperty({ type: String })
  thumbnailUrl?: string;
  @ApiProperty({ type: Boolean })
  published: boolean;
  @ApiProperty({ type: Number })
  viewCount: number;
  @ApiProperty({ type: Date })
  createdAt: Date;
  @ApiProperty({ type: Date })
  updatedAt: Date;
  @ApiProperty({ type: Number })
  authorId?: number;
  @ApiProperty({ type: Number })
  likesCount: number;
  @ApiProperty({ type: Number })
  commentsCount: number;
}
