import { createBrowserRouter } from 'react-router'

import HomePage from '../Pages/HomePage'
import StoryList from '@/Components/Story/storyList'
import StoryReadingPage from '@/Pages/Storypages/StoryReadingPage'
import AddNewStoryPage from '@/Pages/Storypages/AddNewStoryPage'
import UpdateStoryPage from '@/Pages/Storypages/UpdateStoryPage'

const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage
  },
  {
    path: '/stories',
    Component: StoryList
  },
  { path: 'stories/:storyId', Component: StoryReadingPage },
  {
    path: '/addnewstory',
    Component: AddNewStoryPage
  }
  ,{
    path:`/stories/edit/:storyId`,
    Component:UpdateStoryPage
  }
])

export default router
