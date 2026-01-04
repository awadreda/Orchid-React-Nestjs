import type { StoryWithCommentsAndLikes } from '@/types/storyTypes'
import { Typography, Stack, Card, CardContent, Chip } from '@mui/material'
import { NavLink } from 'react-router'

export default function StoriesTab ({
  stories
}: {
  stories: StoryWithCommentsAndLikes[] | []
}) {
  if (!stories.length) {
    return <Typography color='text.secondary'>No stories yet</Typography>
  }

  return (
    <Stack spacing={2}>
      {stories.map(story => (
        <Card key={story.id} variant='outlined' sx={{ borderRadius: 3 }}>
          <CardContent>
            <NavLink to={`/stories/${story.id}`}>
              <Typography fontWeight='bold'>{story.title}</Typography>
            </NavLink>
            <Typography color='text.secondary' variant='body2'>
              {story.caption}
            </Typography>
            <Stack direction='row' spacing={1} mt={1}>
              <Chip size='small' label={`${story.viewCount} views`} />
              <Chip size='small' label={`${story.likes?.length ?? 0} likes`} />
              <Chip
                size='small'
                label={`${story.comments?.length ?? 0} comments`}
              />
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  )
}
