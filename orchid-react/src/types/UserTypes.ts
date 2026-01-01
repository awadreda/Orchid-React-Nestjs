import type { CommentResponseDto } from "./commentType"
import type { LikeResponseDto } from "./LikeType"
import type { StoryResponseDto } from "./storyTypes"

export interface CreateUserDto {
  email: string

  name?: string

  image?: string

  role?: string
}

export interface UpdateUserDto {
  email?: string

  name?: string

  image?: string

  role?: string
}

export interface UserResponseDto {
    id: number;
  email: string;
  name?: string;
  emailVerified?: Date;
  image?: string;
  role: string;
  createdAt: Date;
  comments?: CommentResponseDto[];
  likes?: LikeResponseDto[];
  stories?: StoryResponseDto[];
}
