import { configureStore } from '@reduxjs/toolkit'

import storyReducer from './slices/storySlice'

const store = configureStore({
  reducer: {

      story:storyReducer
    }
  
  
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
