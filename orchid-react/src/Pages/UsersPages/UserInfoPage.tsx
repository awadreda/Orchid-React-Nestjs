import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Tabs,
  Tab,
  Divider
} from '@mui/material'
import { useEffect, useState } from 'react'

import Grid from '@mui/material/GridLegacy'
import { useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from '@/Redux/hooks'
import { getUserByIdSlice } from '@/Redux/slices/UsersSlice'
import LoadingSpinner from '@/Components/RoutingComponents/LoadingSpinner'
import ErrorMessage from '@/Components/RoutingComponents/ErrorMessage'
import type { StoryResponseDto, StoryWithCommentsAndLikes } from '@/types/storyTypes'
import type { CommentResponseDto } from '@/types/commentType'
import CommentsTab from '@/Components/Users/UserInfoPageComponents/CommentsTap'
import StoriesTab from '@/Components/Users/UserInfoPageComponents/StoriesTab'
type Props = {
  user: any
}

export const UserInfo = {
  id: 'u123',
  name: 'Sarah Jenkins',
  email: 'sarah.j@example.com',
  role: 'Senior Contributor',
  image: 'https://i.pravatar.cc/150?u=sarahj', // Placeholder avatar
  createdAt: '2023-05-15T10:30:00Z',

  // Used for the "Likes" StatCard
  likes: [101, 102, 105, 108, 110],

  stories: [
    {
      id: 's1',
      title: 'The Future of React Server Components',
      caption:
        'Exploring how RSCs are changing the way we think about data fetching and performance.',
      viewCount: 1240,
      likes: new Array(45), // Mocking length for the UI chip
      comments: new Array(12) // Mocking length for the UI chip
    },
    {
      id: 's2',
      title: '10 Material UI Tips for Clean Interfaces',
      caption:
        'Small adjustments that make a huge difference in your component library implementation.',
      viewCount: 890,
      likes: new Array(32),
      comments: new Array(5)
    },
    {
      id: 's3',
      title: 'Transitioning from Junior to Senior',
      caption: 'Reflections on the first five years of my engineering career.',
      viewCount: 2105,
      likes: new Array(128),
      comments: new Array(24)
    }
  ],

  comments: [
    {
      id: 'c1',
      content:
        'This is a really insightful take on the state of the industry. Thanks for sharing!',
      createdAt: '2024-01-02T14:20:00Z'
    },
    {
      id: 'c2',
      content:
        'I had a similar issue last week, and your solution worked perfectly.',
      createdAt: '2023-12-20T09:45:00Z'
    },
    {
      id: 'c3',
      content: 'Looking forward to the next part of this series!',
      createdAt: '2023-11-15T18:10:00Z'
    }
  ]
}

export default function UserInfoPage () {
  const [tab, setTab] = useState(0)
  const { userId } = useParams()
  const numUserId = Number(userId)
  const usersState = useAppSelector(state => state.user)

  const user = usersState.user

  const dispatch = useAppDispatch()

  useEffect(() => {
    // Fetch user data based on userID

    dispatch(getUserByIdSlice(numUserId))

    console.log(userId)
  }, [])

  if (usersState.status === 'loading') {
    return <LoadingSpinner />
  }

  if (usersState.status === 'failed') {
    return <ErrorMessage message={usersState.error} />
  }

  if (!user) {
    return <ErrorMessage message='User not found' />
  }

  return (
    <Box maxWidth={1000} mx='auto' mt={4} px={2}>
      {/* Header */}
      <Card elevation={3} sx={{ borderRadius: 4 }}>
        <CardContent>
          <Stack direction='row' spacing={3} alignItems='center'>
            <Avatar
              src={user.image}
              alt={user.name}
              sx={{ width: 90, height: 90, fontSize: 32 }}
            >
              {user.name?.[0]}
            </Avatar>

            <Box flex={1}>
              <Typography variant='h5' fontWeight='bold'>
                {user.name}
              </Typography>
              <Typography color='text.secondary'>{user.email}</Typography>

              <Stack direction='row' spacing={1} mt={1}>
                <Chip label={user.role} color='primary' />
                <Chip
                  label={`Joined ${new Date(
                    user.createdAt
                  ).toLocaleDateString()}`}
                  variant='outlined'
                />
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Stats */}
      <Grid container spacing={2} mt={2}>
        <Grid item xs={4}>
          <StatCard title='Stories' value={user.stories?.length ?? 0} />
        </Grid>
        <Grid item xs={4}>
          <StatCard title='Comments' value={user.comments?.length ?? 0} />
        </Grid>
        <Grid item xs={4}>
          <StatCard title='Likes' value={user.likes?.length ?? 0} />
        </Grid>
      </Grid>

      {/* Tabs */}
      <Card sx={{ mt: 3, borderRadius: 4 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} variant='fullWidth'>
          <Tab label='Stories' />
          <Tab label='Comments' />
        </Tabs>

        <Divider />

        <CardContent>
          {tab === 0 && <StoriesTab stories={user.stories ?? []} />}
          {tab === 1 && <CommentsTab comments={user.comments ?? []} />}
        </CardContent>
      </Card>
    </Box>
  )
}

/* ================= Components ================= */

function StatCard ({ title, value }: { title: string; value: number }) {
  return (
    <Card elevation={2} sx={{ borderRadius: 3, textAlign: 'center' }}>
      <CardContent>
        <Typography variant='h6' fontWeight='bold'>
          {value}
        </Typography>
        <Typography color='text.secondary'>{title}</Typography>
      </CardContent>
    </Card>
  )
}



