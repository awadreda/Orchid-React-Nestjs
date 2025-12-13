import type { CommentResponseDto } from './commentType'
import type { LikeResponseDto } from './LikeType'

export interface CreateStoryDto {
  title: string

  content?: string

  published?: boolean

  authorId?: number
}

// 1. واجهة الإعجاب (Like)
export interface Like {
  id: number
  storyId: number
  userId: number
  createdAt: string // يُخزّن كتاريخ ISO string
}

// 2. واجهة التعليق (Comment)
export interface Comment {
  id: number
  content: string
  storyId: number
  authorId: number
  createdAt: string // يُخزّن كتاريخ ISO string
}

// 3. واجهة القصة الكاملة (Full Story)
export interface StoryWithCommentsAndLikes {
  id: number
  createdAt: string // يُخزّن كتاريخ ISO string
  updatedAt: string // يُخزّن كتاريخ ISO string
  title: string
  caption: string | null // يمكن أن تكون فارغة (null)
  content: string
  thumbnailUrl: string | null // يمكن أن تكون فارغة (null)
  published: boolean
  viewCount: number
  authorId: number
  likes: Like[] // مصفوفة من كائنات Like
  comments: Comment[] // مصفوفة من كائنات Comment
}

export interface StoryResponseDto {
  id: number
  title: string
  content?: string
  published: boolean
  viewCount: number
  createdAt: string
  updatedAt: string
  authorId?: number
}

export interface UpdateStoryDto {
  title?: string

  content?: string

  published?: boolean

  authorId?: number
}

export interface StorySummaryDto {
  id: number
  title: string
  caption?: string
  thumbnailUrl?: string
  published: boolean
  viewCount: number
  createdAt: string
  updatedAt: string
  authorId?: number

  likesCount: number
  commentsCount: number
}
