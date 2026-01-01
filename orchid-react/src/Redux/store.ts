import { configureStore } from '@reduxjs/toolkit'

import storyReducer from './slices/storySlice'
import commentReducer from './slices/CommentSlice'
import userReducer from './slices/UsersSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    story: storyReducer,
    comment: commentReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
