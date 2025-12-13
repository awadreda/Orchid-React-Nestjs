import type {
  CreateStoryDto,
  StoryResponseDto,
  StorySummaryDto,
  StoryWithCommentsAndLikes,
  UpdateStoryDto
} from '@/types/storyTypes'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import {
  createStoryApi,
  getAllStoriesApi,
  getStoriesSummaryByIdApi,
  getStoryByIdApi,
  updateStoryApi
} from '../apis/storiesApi'

interface StoryState {
  stories: StoryResponseDto[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  story: StoryResponseDto | null
  CurrentStory: StoryWithCommentsAndLikes | null
  storySummary: StorySummaryDto | null
  storiesSummary: StorySummaryDto[] | null
}

const initialState: StoryState = {
  stories: [],
  status: 'idle',
  error: null,
  story: {
    id: 0,
    title: '',
    content: '',
    published: false,
    viewCount: 0,
    createdAt: '',
    updatedAt: '',
    authorId: 0
  },
  CurrentStory: null,
  storySummary: null,
  storiesSummary: null
}

export const getAllStoriesSlice = createAsyncThunk(`/allstories`, async () => {
  const response = await getAllStoriesApi()
  return response
})

export const getStoriesSummarySlice = createAsyncThunk(
  `/storiessummary`,
  async () => {
    const response = await getAllStoriesApi()
    console.log('Response from slice:', response)
    return response as StorySummaryDto[]
    // return response
  }
)

export const getStoriesSummaryByIdSlice = createAsyncThunk(
  `/storysummarybyid`,
  async (id: number) => {
    const response = await getStoriesSummaryByIdApi(id)
    return response
  }
)

export const getStoryByIdSlice = createAsyncThunk(
  `/storybyid`,
  async (id: number) => {
    const response = await getStoryByIdApi(id)
    return response
  }
)

export const createStorySlice = createAsyncThunk(
  '/createstory',
  async (storyData: CreateStoryDto) => {
    const response = await createStoryApi(storyData)
    return response.data
  }
)

export const updateStorySlice = createAsyncThunk(
  '/updatestory',
  async ({ id, storyData }: { id: number; storyData: UpdateStoryDto }) => {
    const response = await updateStoryApi(id, storyData)
    return response.data
  }
)

export const deleteStoryApiSlice = createAsyncThunk(
  '/deletestory',
  async (id: number) => {
    const response = await getStoryByIdApi(id)
    return response
  }
)

const storySlice = createSlice({
  name: 'story',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    // Add your extra reducers here

    // Get All Stories
    builder.addCase(getAllStoriesSlice.pending, state => {
      state.status = 'loading'
    })
    builder.addCase(getAllStoriesSlice.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.stories = action.payload
    })

    builder.addCase(getAllStoriesSlice.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message || 'Failed to fetch stories'
    })

    //Get all stories summary

    builder.addCase(getStoriesSummarySlice.pending, state => {
      state.status = 'loading'
    })
    builder.addCase(getStoriesSummarySlice.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.storiesSummary = action.payload as StorySummaryDto[]
    })
    builder.addCase(getStoriesSummarySlice.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message || 'Failed to fetch stories summary'
    })

    // Get Stories Summary By ID

    builder.addCase(getStoriesSummaryByIdSlice.pending, state => {
      state.status = 'loading'
    })
    builder.addCase(getStoriesSummaryByIdSlice.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.storySummary = action.payload as StorySummaryDto
      console.log('Story Summary:', action.payload)
      // state.storySummary = action.payload
    })
    builder.addCase(getStoriesSummaryByIdSlice.rejected, (state, action) => {
      state.status = 'failed'
      state.error =
        action.error.message || 'Failed to fetch stories summary by ID'
    })

    // Get Story By ID
    builder.addCase(getStoryByIdSlice.pending, state => {
      state.status = 'loading'
    })
    builder.addCase(getStoryByIdSlice.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.CurrentStory = action.payload
    })
    builder.addCase(getStoryByIdSlice.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message || 'Failed to fetch story by ID'
    })

    // Create Story
    builder.addCase(createStorySlice.pending, state => {
      state.status = 'loading'
    })
    builder.addCase(createStorySlice.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.stories.push(action.payload)
    })
    builder.addCase(createStorySlice.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message || 'Failed to create story'
    })

    // Update Story

    builder.addCase(updateStorySlice.pending, state => {
      state.status = 'loading'
    })
    builder.addCase(updateStorySlice.fulfilled, (state, action) => {
      state.status = 'succeeded'
      const index = state.stories.findIndex(
        story => story.id === action.payload.id
      )
      if (index !== -1) {
        state.stories[index] = action.payload
      }
    })

    builder.addCase(updateStorySlice.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message || 'Failed to update story'
    })

    // Delete Story

    builder.addCase(deleteStoryApiSlice.pending, state => {
      state.status = 'loading'
    })
    builder.addCase(deleteStoryApiSlice.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.stories = state.stories.filter(
        story => story.id !== action.payload.id
      )
    })

    builder.addCase(deleteStoryApiSlice.rejected, (state, action) => {
      state.status = 'failed'
      state.error = action.error.message || 'Failed to delete story'
    })
  }
})

export default storySlice.reducer
