import type { CreateStoryDto, UpdateStoryDto } from '@/Types/storyTypes'
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


export const createStoryApi = async (storyData: CreateStoryDto) => {
  try {
    const response = await api.post('/createstory', storyData)
    return response.data
  } catch (error) {
    console.error('Error creating story:', error)
    throw error
  }
}

export const updateStoryApi = async(id:number, storyData: UpdateStoryDto)  => {
  try {
    const response = await api.put(`/updatestory/${id}`, storyData)
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