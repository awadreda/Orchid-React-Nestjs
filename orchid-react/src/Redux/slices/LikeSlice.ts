import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addLike, fetchLikesCountByStoryID, removeLike } from "../apis/LikesApi"
import type { CreateLikeDto } from "@/types/LikeType"


interface likeState {
  likes: number
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | undefined
}


const initialState: likeState = {
  likes: 0,
  status: 'idle',
  error: ""
}



export const getLikesCountThunk = createAsyncThunk<number,number,{rejectValue:string}>(
  'likes/getLikesCount',
  async (storyId: number, { rejectWithValue }) => {
    try {
      const response = await fetchLikesCountByStoryID(storyId)
      return response
    } catch (error) {
      return rejectWithValue('Failed to fetch likes count')
    }
  }
)

export const addLikeThunk = createAsyncThunk<number, CreateLikeDto, { rejectValue: string }>(
  'likes/addLike',
  async (dto: CreateLikeDto, { rejectWithValue }) => {
    try {
      const response = await addLike(dto)
      return response
    } catch (error) {
      return rejectWithValue('Failed to add like')
    }
  }
)

export const removeLikeThunk = createAsyncThunk<number, CreateLikeDto, { rejectValue: string }>(
  'likes/removeLike',
  async (dto: CreateLikeDto, { rejectWithValue }) => {
    try {
      const response = await removeLike(dto)
      return response
    } catch (error) {
      return rejectWithValue('Failed to remove like')
    }
  }
)


const likeSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLikesCountThunk.fulfilled, (state, action) => {
        state.likes = action.payload
        state.status = 'succeeded'
      })
      .addCase(getLikesCountThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getLikesCountThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(addLikeThunk.fulfilled, (state, action) => {
        state.likes += 1
        state.status = 'succeeded'
      })
      .addCase(addLikeThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(addLikeThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(removeLikeThunk.fulfilled, (state, action) => {
        state.likes -= 1
        state.status = 'succeeded'
      })
      .addCase(removeLikeThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(removeLikeThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  }
})
