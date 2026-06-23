import { createBrowserRouter } from 'react-router'

import HomePage from '../Pages/HomePage'
import StoryList from '@/Components/Story/storyList'
import StoryReadingPage from '@/Pages/Storypages/StoryReadingPage'
import AddNewStoryPage from '@/Pages/Storypages/AddNewStoryPage'
import UpdateStoryPage from '@/Pages/Storypages/UpdateStoryPage'

import UsersTable from '@/Pages/UsersPages/Userstable'
import UserInfoPage from '@/Pages/UsersPages/UserInfoPage'

import LoginPage from '@/Pages/AuthPages/LoginPage'
import RegisterPage from '@/Pages/AuthPages/RegesterPage'

const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage
  },
  {
    path: '/login',
    Component: LoginPage
  },
  {
    path: '/register',
    Component: RegisterPage
  },
  {
    path: '/stories',
    Component: StoryList
  },
  { path: 'stories/:storyId', Component: StoryReadingPage },
  {
    path: '/addnewstory',
    Component: AddNewStoryPage
  },
  {
    path: `/stories/edit/:storyId`,
    Component: UpdateStoryPage
  },
  {
    path: '/usersTable',
    Component: UsersTable
  },
  {
    path: '/users/:userId',
    Component: UserInfoPage
  }
])

export default router
