


// DTO for comment response
export interface CommentResponseDto {
  id: number;
  content: string;
  storyId: number;
  authorId: number;
  createdAt: Date;
}

export type CreateCommentDto = {
  content: string
  storyId: number
  authorId: number
}


export type UpdateCommentDto = {
  content?: string
}

