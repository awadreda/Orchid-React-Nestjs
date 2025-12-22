import type { CommentResponseDto, CreateCommentDto, UpdateCommentDto } from '@/types/commentType'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/comment',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'text/plain'
  }
})

export const getCommentsByStoryIdApi = async (storyId: number) => {
  try {
    const response = await api.get(`/GetCommentsByStoryId/${storyId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching comments by story ID:', error)
    throw error
  }
}

// GetCommentById / { id }

export const getCommentByIdApi = async (id: number) => {
  try {
    const response = await api.get(`/GetCommentById/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching comment by ID:', error)
    throw error
  }
}

// CreateComment

export const createCommentApi = async (commentData: CreateCommentDto) => {
  try {
    const response = await api.post('/CreateComment', commentData)
    return response.data
  } catch (error) {
    console.error('Error creating comment:', error)
    throw error
  }
}

export const updateCommentApi = async (
  id: number,
  commentData: UpdateCommentDto
) => {
  try {
    const response = await api.put(`/UpdateComment/${id}`, commentData)
    return response.data
  } catch (error) {
    console.error('Error updating comment:', error)
    throw error
  }
}

// DeleteComment / { id }

export const deleteCommentApi = async (id: number) => {
  try {
    const response = await api.delete(`/DeleteComment/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting comment:', error)
    throw error
  }
}
