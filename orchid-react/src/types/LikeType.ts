export interface CreateLikeDto {
  storyId: number

  userid: number
}

export interface LikeResponseDto {
  id: number
  storyId: number
  userId: number
  createdAt: Date
}
