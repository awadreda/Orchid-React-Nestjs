import { ApiProperty } from '@nestjs/swagger';
import { Like } from '@prisma/client';
import { CommentResponseDto } from 'src/comment/dto/comment-response.dto';
import { LikeResponseDto } from 'src/like/dto/LikeResponseDto';
import { StoryResponseDto } from 'src/story/dto/story-response.dto';

export class UserResponseDto {
  @ApiProperty({ type: Number })
  id: number;
  @ApiProperty({ type: String })
  email: string;
  @ApiProperty({ type: String })
  name?: string;
  @ApiProperty({ type: Date })
  emailVerified?: Date;
  @ApiProperty({ type: String })
  image?: string;
  @ApiProperty({ type: String })
  role: string;
  @ApiProperty({ type: Date })
  createdAt: Date;
  @ApiProperty({ type: () => [CommentResponseDto] })
  comments?: CommentResponseDto[];
  @ApiProperty({ type: () => [LikeResponseDto] })
  likes?: LikeResponseDto[];
  @ApiProperty({ type: () => [StoryResponseDto] })
  stories?: StoryResponseDto[];
  // accounts?: Account[];
  // sessions?: Session[];
}



export class UserDashboardDto {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  name?: string;

  @ApiProperty({ type: String })
  role: string;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Number })
  storiesCount: number;

  @ApiProperty({ type: Number })
  commentsCount: number;
}
