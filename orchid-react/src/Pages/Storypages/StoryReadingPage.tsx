import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  Box,
  Typography,
  Divider,
  CircularProgress,
  Stack,
  Button
} from '@mui/material'
import MarkdownRenderer from '../../Components/MarkDown/MarkdownRenderer'
import { useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from '@/Redux/hooks'
import { getStoryByIdSlice } from '@/Redux/slices/storySlice'
import ReturnHome from '@/Components/Home/ReturnHome'
import AddComment from '@/Components/Comments/AddComment'

export default function StoryReadingPage () {
  const { storyId } = useParams()

  const [loading, setLoading] = useState(true)

  const dispatch = useAppDispatch()
  const stroyApi = useAppSelector(state => state.story)
  const story = stroyApi.CurrentStory

  useEffect(() => {
    dispatch(getStoryByIdSlice(Number(storyId))).then(() => {
      setLoading(false)
      console.log('Story fetched:', story)
    })
  }, [dispatch, storyId])

  if (loading) return <CircularProgress />

  return (
    <Box sx={{ maxWidth: '800px', mx: 'auto', mt: 4 }}>
      {/* Title */}

      <Typography variant='h4' fontWeight='bold' mb={2}>
        {story?.title}
      </Typography>

      {/* Likes section */}
      <Stack direction='row' spacing={2} alignItems='center' mb={3}>
        <ReturnHome />

        <Typography>{story?.likes.length} Likes</Typography>
        <Button variant='contained' size='small'>
          Like
        </Button>
      </Stack>

      <Divider sx={{ my: 2 }} />

      {/* Markdown Content */}
      <Box sx={{ mt: 2, fontSize: '18px', lineHeight: 1.8 }}>
        {/* <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {story?.content || ''}
</ReactMarkdown> */}

        <MarkdownRenderer>{story?.content || ''}</MarkdownRenderer>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Comments */}
      <Typography variant='h5' mb={2}>
        Comments
      </Typography>

      <Box>
        {story?.comments.length === 0 && (
          <Typography>No comments yet</Typography>
        )}

        <AddComment userId={1} storyId={Number(storyId)} />

        {story?.comments.map(c => (
          <Box
            key={c.id}
            sx={{ mb: 2, p: 2, border: '1px solid #333', borderRadius: 2 }}
          >
            <Typography fontWeight='bold'>{c.authorId}</Typography>
            <Typography>{c.content}</Typography>
            <Typography variant='caption' color='gray'>
              {c.createdAt}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
