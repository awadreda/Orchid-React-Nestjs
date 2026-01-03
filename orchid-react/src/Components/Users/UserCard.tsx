import { Card, CardContent, Typography, Stack, IconButton } from '@mui/material'
import { Edit, Delete, Visibility } from '@mui/icons-material'
// import type { UserRow } from '@/Pages/UsersPages/Userstable'
import type { UserDashboardDto } from '@/types/UserTypes'



export default function UserCard ({ user }: { user: UserDashboardDto }) {
  return (
    <Card variant='outlined' sx={{ mb: 2 }}>
      <CardContent>
        <Stack spacing={0.5}>
          <Typography variant='h6'>{user.name}</Typography>
          <Typography variant='body2' color='text.secondary'>
            {user.email}
          </Typography>

          <Typography variant='body2'>Role: {user.role}</Typography>

          <Typography variant='body2'>
            Stories: {user.storiesCount} | Comments: {user.commentsCount}
          </Typography>

          <Typography variant='caption' color='text.secondary'>
            Created: {user.createdAt.toString()}
          </Typography>

          <Stack direction='row' spacing={1} mt={1}>
            <IconButton size='small' color='primary'>
              {/* <Visibility /> */}
            </IconButton>
            <IconButton size='small' color='warning'>
              {/* <Edit /> */}
            </IconButton>
            <IconButton size='small' color='error'>
              {/* <Delete /> */}
            </IconButton>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
