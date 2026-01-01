import { Like } from '@prisma/client';
import { CommentResponseDto } from 'src/comment/dto/comment-response.dto';
import { StoryResponseDto } from 'src/story/dto/story-response.dto';

export class UserResponseDto {
  id: number;
  email: string;
  name?: string;
  emailVerified?: Date;
  image?: string;
  role: string;
  createdAt: Date;
  comments?: CommentResponseDto[];
  likes?: Like[];
  stories?: StoryResponseDto[];
  // accounts?: Account[];
  // sessions?: Session[];
}
