import type { AuthTokensDto, LoginDto, RegisterUserDto } from '@/types/authTypes'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/auth',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

export const loginApi = async (loginDto: LoginDto): Promise<AuthTokensDto> => {
  try {
    const response = await api.post<AuthTokensDto>('/login', loginDto)
    return response.data
  } catch (error) {
    console.error('Error logging in:', error)
    throw error
  }
}

export const registerApi = async (
  registerDto: RegisterUserDto
): Promise<AuthTokensDto> => {
  try {
    const response = await api.post<AuthTokensDto>('/register', registerDto)
    return response.data
  } catch (error) {
    console.error('Error registering user:', error)
    throw error
  }
}

export const logoutApi = async (access_token: string): Promise<void> => {
  try {
    await api.post(
      '/logOut',
      {},
      {
        headers: { Authorization: `Bearer ${access_token}` }
      }
    )
  } catch (error) {
    console.error('Error logging out:', error)
    throw error
  }
}

export const refreshTokenApi = async (
  refresh_token: string
): Promise<{ access_token: string }> => {
  try {
    const response = await api.post<{ access_token: string }>(
      '/refresh',
      {},
      {
        headers: { Authorization: `Bearer ${refresh_token}` }
      }
    )
    return response.data
  } catch (error) {
    console.error('Error refreshing token:', error)
    throw error
  }
}