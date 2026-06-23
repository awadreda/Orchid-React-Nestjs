import type { AuthState, LoginDto, RegisterUserDto } from '@/types/authTypes'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loginApi, logoutApi, refreshTokenApi, registerApi } from '../apis/AuthApi'

const initialState: AuthState = {
  access_token: localStorage.getItem('access_token') || null,
  refresh_token: localStorage.getItem('refresh_token') || null,
  status: 'idle',
  error: null
}

export const loginSlice = createAsyncThunk('/auth/login', async (loginDto: LoginDto) => {
  const response = await loginApi(loginDto)
  return response
})

export const registerSlice = createAsyncThunk(
  '/auth/register',
  async (registerDto: RegisterUserDto) => {
    const response = await registerApi(registerDto)
    return response
  }
)

export const logoutSlice = createAsyncThunk(
  '/auth/logOut',
  async (access_token: string) => {
    await logoutApi(access_token)
  }
)

export const refreshTokenSlice = createAsyncThunk(
  '/auth/refresh',
  async (refresh_token: string) => {
    const response = await refreshTokenApi(refresh_token)
    return response
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuth: state => {
      state.access_token = null
      state.refresh_token = null
      state.status = 'idle'
      state.error = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    }
  },
  extraReducers: builder => {
    // Login
    builder.addCase(loginSlice.pending, state => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(loginSlice.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.access_token = action.payload.access_token
      state.refresh_token = action.payload.refresh_token
      localStorage.setItem('access_token', action.payload.access_token)
      localStorage.setItem('refresh_token', action.payload.refresh_token)
    })
    builder.addCase(loginSlice.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message || 'Login failed'
    })

    // Register
    builder.addCase(registerSlice.pending, state => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(registerSlice.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.access_token = action.payload.access_token
      state.refresh_token = action.payload.refresh_token
      localStorage.setItem('access_token', action.payload.access_token)
      localStorage.setItem('refresh_token', action.payload.refresh_token)
    })
    builder.addCase(registerSlice.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message || 'Registration failed'
    })

    // Logout
    builder.addCase(logoutSlice.pending, state => {
      state.status = 'loading'
    })
    builder.addCase(logoutSlice.fulfilled, state => {
      state.status = 'idle'
      state.access_token = null
      state.refresh_token = null
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    })
    builder.addCase(logoutSlice.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message || 'Logout failed'
    })

    // Refresh Token
    builder.addCase(refreshTokenSlice.pending, state => {
      state.status = 'loading'
    })
    builder.addCase(refreshTokenSlice.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.access_token = action.payload.access_token
      localStorage.setItem('access_token', action.payload.access_token)
    })
    builder.addCase(refreshTokenSlice.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message || 'Token refresh failed'
    })
  }
})

export const { clearAuth } = authSlice.actions
export default authSlice.reducer
