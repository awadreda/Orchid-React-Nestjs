import type {
  CommentResponseDto,
  CreateCommentDto,
  UpdateCommentDto
} from '@/types/commentType'


import {
  createCommentApi,
  deleteCommentApi,
  getCommentByIdApi,
  getCommentsByStoryIdApi,
  updateCommentApi
} from '../apis/CommentsApi'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface CommentState {
  comments: CommentResponseDto[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null

  comment: CommentResponseDto | null
}

const initialState: CommentState = {
  comments: [],
  status: 'idle',
  error: null,
  comment: null
}

export const getCommentsByStoryIdSlice = createAsyncThunk(
  '/getcommentsbystoryid',
  async (storyId: number) => {
    const response = await getCommentsByStoryIdApi(storyId)
    return response as CommentResponseDto[]
  }
)

export const getCommentByIdSlice = createAsyncThunk(
  '/getcommentbyid',
  async (id: number) => {
    const response = await getCommentByIdApi(id)
    return response as CommentResponseDto
  }
)

export const CreateCommentSlice = createAsyncThunk(
  '/createcomment',
  async (commentData: CreateCommentDto) => {
    const response = await createCommentApi(commentData)
    return response as CommentResponseDto
  }
)

export const UpdateCommentSlice = createAsyncThunk(
  '/updatecomment',
  async ({
    id,
    commentData
  }: {
    id: number
    commentData: UpdateCommentDto
  }) => {
    const response = await updateCommentApi(id, commentData)
    return response as CommentResponseDto
  }
)

export const deleteCommentSlice = createAsyncThunk(
  '/deletecomment',
  async (id: number) => {
    const response = await deleteCommentApi(id)
    return response as CommentResponseDto
  }
)

const CommentSlice = createSlice({
  name: 'comment',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder

      // Get Comments by Story ID
      .addCase(getCommentsByStoryIdSlice.pending, state => {
        state.status = 'loading'
      })
      .addCase(getCommentsByStoryIdSlice.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.comments = action.payload
      })
      .addCase(getCommentsByStoryIdSlice.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch comments'
      })

      // Create Comment
      .addCase(CreateCommentSlice.fulfilled, (state, action) => {
        state.comments.push(action.payload)
        state.status = 'succeeded'
      })
      .addCase(CreateCommentSlice.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to create comment'
      })
      .addCase(CreateCommentSlice.pending, state => {
        state.status = 'loading'
      })
      // Delete Comment
      .addCase(deleteCommentSlice.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          comment => comment.id !== action.payload.id
        )
      })
      .addCase(deleteCommentSlice.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to delete comment'
      })
      .addCase(deleteCommentSlice.pending, state => {
        state.status = 'loading'
      })
      // Update Comment
      .addCase(UpdateCommentSlice.fulfilled, (state, action) => {
        const index = state.comments.findIndex(
          comment => comment.id === action.payload.id
        )
        if (index !== -1) {
          state.comments[index] = action.payload
        }
      })
      .addCase(UpdateCommentSlice.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to update comment'
      })
      .addCase(UpdateCommentSlice.pending, state => {
        state.status = 'loading'
      })
      // Get Comment by ID
      .addCase(getCommentByIdSlice.pending, state => {
        state.status = 'loading'
      })
      .addCase(getCommentByIdSlice.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.comment = action.payload
      })
      .addCase(getCommentByIdSlice.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch comment'
      })
  }
})

export default CommentSlice.reducer
