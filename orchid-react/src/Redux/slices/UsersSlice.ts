import type {
  UserResponseDto,
  UpdateUserDto,
  CreateUserDto,
  UserDashboardDto
} from '@/types/UserTypes'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  deleteUserApi,
  updateUserApi,
  createUserApi,
  getUserByIdApi,
  getUsersApi,
  getUsersDashboardDataApi
} from '../apis/UsersApi'

interface userState {
  users: UserResponseDto[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  user: UserResponseDto | null
  usersDashboard: UserDashboardDto[] | null
  userDashboard: UserDashboardDto | null
}

const initialState: userState = {
  users: [],
  status: 'idle',
  error: null,
  user: null,
  usersDashboard: null,
  userDashboard: null
}


export const getUsersDashboardSlice = createAsyncThunk(
  '/users/dashboard',
  async (): Promise<UserDashboardDto[] | null> => {
    const response = await getUsersDashboardDataApi()
    return response
  }
)






//getUsers

export const getUsersSlice = createAsyncThunk 
(
  '/users',
  async (): Promise<UserResponseDto[]> => {
    const response = await getUsersApi()
    return response
  }
)


//getUserById

export const getUserByIdSlice = createAsyncThunk(
  '/userbyid',
  async (id: number): Promise<UserResponseDto | null> => {
    const response = await getUserByIdApi(id)
    return response
  }
)

//deleteUser

export const deleteUserSlice = createAsyncThunk(
  '/deleteuser',
  async (id: number) => {
    const response = await deleteUserApi(id)
    return response
  }
)

//updateUser
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

//createUser
export const createUserSlice = createAsyncThunk(
  '/createuser',
  async (createUserDto: CreateUserDto): Promise<UserResponseDto | null> => {
    const response = await createUserApi(createUserDto)
    return response
  }
)




const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    //deleteUser
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

    //updateUser

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

    //createUser
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

    //getUserById
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

    //getUsers
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

    //getUsersDashboard
    builder.addCase(getUsersDashboardSlice.pending, state => {
      state.status = 'loading'
    })
    builder.addCase(getUsersDashboardSlice.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.usersDashboard = action.payload
    })
    builder.addCase(getUsersDashboardSlice.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message || 'Failed to get users dashboard'
    })

  }
})

export default userSlice.reducer
