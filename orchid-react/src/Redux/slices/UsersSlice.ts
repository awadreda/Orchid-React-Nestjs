import type {
  UserResponseDto,
  UpdateUserDto,
  CreateUserDto
} from '@/types/UserTypes'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  deleteUserApi,
  updateUserApi,
  createUserApi,
  getUserByIdApi,
  getUsersApi
} from '../apis/UsersApi'

interface userState {
  users: UserResponseDto[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  user: UserResponseDto | null
}

const initialState: userState = {
  users: [],
  status: 'idle',
  error: null,
  user: null
}

export const deleteUserSlice = createAsyncThunk(
  '/deleteuser',
  async (id: number) => {
    const response = await deleteUserApi(id)
    return response
  }
)

export const updateUserSlice = createAsyncThunk(
  '/updateuser',
  async ({
    id,
    updateUserDto
  }: {
    id: number
    updateUserDto: UpdateUserDto
  }): Promise<UserResponseDto | null> => {
    const response = await updateUserApi(id, updateUserDto)
    return response
  }
)

export const createUserSlice = createAsyncThunk(
  '/createuser',
  async (createUserDto: CreateUserDto): Promise<UserResponseDto | null> => {
    const response = await createUserApi(createUserDto)
    return response
  }
)

export const getUserByIdSlice = createAsyncThunk(
  '/userbyid',
  async (id: number): Promise<UserResponseDto | null> => {
    const response = await getUserByIdApi(id)
    return response
  }
)

export const getUsersSlice = createAsyncThunk(
  '/users',
  async (): Promise<UserResponseDto[]> => {
    const response = await getUsersApi()
    return response
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(deleteUserSlice.pending, state => {
      state.status = 'loading'
    })
    builder.addCase(deleteUserSlice.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.users = state.users.filter(
        user => user.id !== action.payload.user?.id
      )
    })
    builder.addCase(deleteUserSlice.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message || 'Failed to delete user'
    })

    builder.addCase(updateUserSlice.pending, state => {
      state.status = 'loading'
    })
    builder.addCase(updateUserSlice.fulfilled, (state, action) => {
      state.status = 'succeeded'
      const index = state.users.findIndex(
        user => user.id === action.payload?.id
      )
      if (index !== -1 && action.payload) {
        state.users[index] = action.payload
      }
    })
    builder.addCase(updateUserSlice.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message || 'Failed to update user'
    })

    builder.addCase(createUserSlice.pending, state => {
      state.status = 'loading'
    })
    builder.addCase(createUserSlice.fulfilled, (state, action) => {
      state.status = 'succeeded'
      if (action.payload) {
        state.users.push(action.payload)
      }
    })
    builder.addCase(createUserSlice.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message || 'Failed to create user'
    })

    builder.addCase(getUserByIdSlice.pending, state => {
      state.status = 'loading'
    })
    builder.addCase(getUserByIdSlice.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.user = action.payload
    })
    builder.addCase(getUserByIdSlice.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message || 'Failed to get user by ID'
    })

    builder.addCase(getUsersSlice.pending, state => {
      state.status = 'loading'
    })
    builder.addCase(getUsersSlice.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.users = action.payload
    })
    builder.addCase(getUsersSlice.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message || 'Failed to get users'
    })
  }
})

export default userSlice.reducer
