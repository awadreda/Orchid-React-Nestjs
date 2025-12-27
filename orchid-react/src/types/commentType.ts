import type { UserResponseDto } from "./UserTypes"

// DTO for comment response
export interface CommentResponseDto {
  id: number
  content: string
  storyId: number
  authorId: number
  parentCommentId?: number
  replies: CommentResponseDto[]
  author:UserResponseDto
  createdAt: Date
}

export type CreateCommentDto = {
  content: string
  parentCommentId?: number
  storyId: number
  authorId: number
}

export type UpdateCommentDto = {
  content?: string
}
