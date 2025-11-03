export class StoryResponseDto {
  id: number;
  title: string;
  content?: string;
  published: boolean;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
  authorId?: number;
}
