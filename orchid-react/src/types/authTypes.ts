export interface LoginDto {
  email: string
  password: string
}

export interface RegisterUserDto {
  email: string
  name?: string
  password: string
  image?: string
}

export interface AuthTokensDto {
  access_token: string
  refresh_token: string
}

export interface AuthState {
  access_token: string | null
  refresh_token: string | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}
