import type { CreateLikeDto } from "@/types/LikeType"
import axios from "axios"

const api = axios.create({
  baseURL: 'http://localhost:3000/like',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'text/plain'
  }
})

export const fetchLikesCountByStoryID = async (storyId: number) => {
  try {
    const response = await api.get(`/getStoryLikesCount/${storyId}`)
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch likes count')
  }
}

export const addLike = async (dto: CreateLikeDto) => {
  try {
    const response = await api.post(`/likeStory`, dto)
    return response.data
  } catch (error) {
    throw new Error('Failed to add like')
  }
}

export const removeLike = async (dto: CreateLikeDto) => {
  try {
    const response = await api.delete(`/unlikeStory/${dto.storyId}/${dto.userId}`)
    return response.data
  } catch (error) {
    throw new Error('Failed to remove like')
  }
}
