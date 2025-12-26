


// DTO for comment response
export interface CommentResponseDto {
  id: number;
  content: string;
  storyId: number;
  authorId: number;
  username: string;
  createdAt: Date;
}

export type CreateCommentDto = {
  content: string
  storyId: number
  authorId: number
  username: string
}


export type UpdateCommentDto = {
  content?: string
}

