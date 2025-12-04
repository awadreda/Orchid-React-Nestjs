export interface CreateStoryDto {
  title: string

  content?: string

  published?: boolean

  authorId?: number
}

export interface StoryResponseDto {
  id: number
  title: string
  content?: string
  published: boolean
  viewCount: number
  createdAt: Date
  updatedAt: Date
  authorId?: number
}

export interface UpdateStoryDto {
  title?: string

  content?: string

  published?: boolean

  authorId?: number
}
