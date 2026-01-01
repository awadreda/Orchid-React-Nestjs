import type {
  CreateUserDto,
  UpdateUserDto,
  UserResponseDto
} from '@/types/UserTypes'
import axios from 'axios'

const Api = axios.create({
  baseURL: 'http://localhost:3000/user',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'text/plain'
  }
})

export const getUsersApi = async (): Promise<UserResponseDto[]> => {
  try {
    const response = await Api.get<UserResponseDto[]>('/allusers')
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

export const getUserByIdApi = async (
  id: number
): Promise<UserResponseDto | null> => {
  try {
    const response = await Api.get<UserResponseDto>(`/userbyid/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching user by ID ${id}:`, error)
    throw error
  }
}

export const createUserApi = async (
  createUserDto: CreateUserDto
): Promise<UserResponseDto | null> => {
  try {
    const response = await Api.post<UserResponseDto>(
      '/createuser',
      createUserDto
    )
    return response.data
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

export const updateUserApi = async (
  id: number,
  updateUserDto: UpdateUserDto
): Promise<UserResponseDto | null> => {
  try {
    const response = await Api.put<UserResponseDto>(
      `/updateuser/${id}`,
      updateUserDto
    )
    return response.data
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error)
    throw error
  }
}

export const deleteUserApi = async (
  id: number
): Promise<{ message: string; user: UserResponseDto | null }> => {
  try {
    const response = await Api.delete<{
      message: string
      user: UserResponseDto | null
    }>(`/deleteuser/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error)
    throw error
  }
}
