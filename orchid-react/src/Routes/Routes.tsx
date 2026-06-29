import HomePage from '@/Pages/HomePage'
import {
  Component,
  lazy,
  Suspense,
  type ComponentType,
  type SuspenseProps
} from 'react'
import { createBrowserRouter } from 'react-router'

// import HomePage from '../Pages/HomePage'
// import StoryList from '@/Components/Story/storyList'
// import StoryReadingPage from '@/Pages/Storypages/StoryReadingPage'
// import AddNewStoryPage from '@/Pages/Storypages/AddNewStoryPage'
// import UpdateStoryPage from '@/Pages/Storypages/UpdateStoryPage'

// import UsersTable from '@/Pages/UsersPages/Userstable'
// import UserInfoPage from '@/Pages/UsersPages/UserInfoPage'

// import LoginPage from '@/Pages/AuthPages/LoginPage'
// import RegisterPage from '@/Pages/AuthPages/RegesterPage'

// const HomePage = lazy(() => import('../Pages/HomePage'))
const StoryList = lazy(() => import('@/Components/Story/storyList'))
export  const preloadStoryList = () => import('@/Components/Story/storyList')

const StoryReadingPage = lazy(
  () => import('@/Pages/Storypages/StoryReadingPage')
)
const AddNewStoryPage = lazy(() => import('@/Pages/Storypages/AddNewStoryPage'))
const UpdateStoryPage = lazy(() => import('@/Pages/Storypages/UpdateStoryPage'))
const UsersTable = lazy(() => import('@/Pages/UsersPages/Userstable'))
const UserInfoPage = lazy(() => import('@/Pages/UsersPages/UserInfoPage'))
const LoginPage = lazy(() => import('@/Pages/AuthPages/LoginPage'))
const RegisterPage = lazy(() => import('@/Pages/AuthPages/RegesterPage'))

const Loadable = (Component: ComponentType) => (props: any) =>
  (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  )

const router = createBrowserRouter([
  {
    path: '/',
    Component: HomePage
  },
  {
    path: '/login',
    Component: Loadable(LoginPage)
  },
  {
    path: '/register',
    Component: Loadable(RegisterPage)
  },
  {
    path: '/stories',
    Component: Loadable(StoryList)
  },
  { path: 'stories/:storyId', Component: Loadable(StoryReadingPage) },
  {
    path: '/addnewstory',
    Component: Loadable(AddNewStoryPage)
  },
  {
    path: `/stories/edit/:storyId`,
    Component: Loadable(UpdateStoryPage)
  },
  {
    path: '/usersTable',
    Component: Loadable(UsersTable)
  },
  {
    path: '/users/:userId',
    Component: Loadable(UserInfoPage)
  }
])

export default router
