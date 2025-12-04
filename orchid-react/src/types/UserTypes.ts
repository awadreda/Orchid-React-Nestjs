export interface CreateUserDto {
  email: string

  name?: string

  image?: string

  role?: string
}

export interface UpdateUserDto {
  email?: string

  name?: string

  image?: string

  role?: string
}

export interface UserResponseDto {
  id: number
  email: string
  name?: string
  image?: string
  role: string
  createdAt: Date
}
