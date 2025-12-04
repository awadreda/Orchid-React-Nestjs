import { Like } from "@prisma/client";


export class StoryResponseDto {
  id: number;
  title: string;
  caption?: string;
  content?: string;
  thumbnailUrl?: string;

  published: boolean;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
  authorId?: number;
  likes?: Like[];
  comments?: Comment[];
}

export class storySummryDto {
  id: number;
  title: string;
  caption?: string;
  thumbnailUrl?: string;
  published: boolean;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
  authorId?: number;

  likesCount: number;
  commentsCount: number;
}
