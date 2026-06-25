export interface CreateLikeDto {
  storyId: number

  userId: number
}

export interface LikeResponseDto {
  id: number
  storyId: number
  userId: number
  createdAt: Date
}
