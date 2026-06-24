import type {
  CreateStoryDto,
  StorySummaryDto,
  UpdateStoryDto
} from '@/types/storyTypes'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/story',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'text/plain'
  }
})

export const getAllStoriesApi = async () => {
  try {
    const response = await api.get(`/allstories`)
    return response.data 
  } catch (error) {
    console.error('Error fetching all stories:', error)
    throw error
  }
}

export const getStoriesSummaryApi = async () => {
  try {
    const response = await api.get(`/storiessummary`)
    return response.data as StorySummaryDto[]
  } catch (error) {
    console.error('Error fetching stories summary:', error)
    throw error
  }
}

export const getStoryByIdApi = async (id: number) => {
  try {
    const response = await api.get(`storybyid
/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching story by ID:', error)
    throw error
  }
}

export const getStoriesSummaryByIdApi = async (id: number) => {
  try {
    const response = await api.get(`storysummarybyid/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching stories summary by ID:', error)
    throw error
  }
}

export const createStoryApi = async (storyData: CreateStoryDto) => {
  try {
      const formData = new FormData();
      formData.append('title', storyData.title);

      if (storyData.content) {
        formData.append('content', storyData.content);
      }
      if (storyData.caption) {
        formData.append('caption', storyData.caption);
      }
      if (storyData.thumbnail) {
        formData.append('thumbnail', storyData.thumbnail);
      }
      if (storyData.authorId) {
        formData.append('authorId', storyData.authorId.toString());
      }
      if (storyData.published !== undefined) {
        formData.append('published', storyData.published.toString());
      }


    const response = await api.post('/createstory', formData ,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error creating story:', error)
    throw error
  }
}



export const updateStoryApi = async (id: number, storyData: UpdateStoryDto) => {
  try {

      const formData = new FormData()
      if (storyData.title) formData.append('title', storyData.title)
      if (storyData.content) formData.append('content', storyData.content)
      if (storyData.caption) formData.append('caption', storyData.caption)
      if (storyData.thumbnail) formData.append('thumbnail', storyData.thumbnail)
      if (storyData.published !== undefined) formData.append('published', storyData.published.toString())
      if (storyData.authorId) formData.append('authorId', storyData.authorId.toString())

    const response = await api.put(`/updatestory/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  } catch (error) {
    console.error('Error updating story:', error)
    throw error
  }
}

export const deleteStoryApi = async (id: number) => {
  try {
    const response = await api.delete(`/deletestory/${id}`)
    return response.data
  } catch (error) {
    console.error('Error deleting story:', error)
    throw error
  }
}
