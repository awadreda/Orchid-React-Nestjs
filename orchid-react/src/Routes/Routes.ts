import { createBrowserRouter } from 'react-router'

import HomePage from '../Pages/HomePage'
import StoryList from '@/Components/Story/storyList'
import StoryPage from '@/Components/Story/StoryPage'

const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage
  },
  {
    path: '/stories',
    Component: StoryList
  },
  { path: 'stories/:storyId', Component: StoryPage }
])

export default router
