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
import MarkdownRenderer from '../MarkDown/MarkdownRenderer'

interface Story {
  id: number
  title: string
  content: string // markdown text
  likes: number
}

interface Comment {
  id: number
  content: string
  authorName: string
  createdAt: string
}

export const story: Story = {
  id: 1,
  title: 'The Lost Orchid',
  content: `
# The Lost Orchid

Once upon a time, in a quiet village, a rare **orchid** was discovered.

## Discovery

The villagers **were** amazed by its *beauty* and mysterious glow.

- It glowed at night  
- It had a unique fragrance  
- It bloomed only once every 10 years  
- It bloomed only once every 10 years  
 It bloomed only once every 10 years  

### Legend

> Some said the orchid brought peace and prosperity.  
> Others believed it was a sign of an old prophecy.

\`\`\`ts
// Example code block
function hello() {
  console.log("Orchid story!");
}
\`\`\`

## **Conclusion**

The orchid became a symbol of **hope** and **renewal** for the entire village.
  `,
  likes: 32
}

export const comments: Comment[] = [
  {
    id: 1,
    content: 'Amazing story! The symbolism was beautiful.',
    authorName: 'Sarah Ahmed',
    createdAt: '2025-12-01T10:30:00Z'
  },
  {
    id: 2,
    content: 'I liked the part about the prophecy. Very mysterious.',
    authorName: 'Omar Hassan',
    createdAt: '2025-12-02T08:15:00Z'
  },
  {
    id: 3,
    content: 'Great writing. Looking forward to more stories!',
    authorName: 'Lina Mostafa',
    createdAt: '2025-12-02T12:50:00Z'
  }
]

export default function StoryPage () {
  // const { id } = useParams()
  // const [story, setStory] = useState<Story | null>(null)
  // const [comments, setComments] = useState<Comment[]>([])
  // const [loading, setLoading] = useState(true)

  // // useEffect(() => {
  //   loadData()
  // }, [])

  // async function loadData () {
  //   const s = await fetch(`/api/story/${id}`).then(r => r.json())
  //   const c = await fetch(`/api/comment/story/${id}`).then(r => r.json())
  //   setStory(s)
  //   setComments(c)
  //   setLoading(false)
  // }

  // if (loading) return <CircularProgress />

  return (
    <Box sx={{ maxWidth: '800px', mx: 'auto', mt: 4 }}>
      {/* Title */}
      <Typography variant='h4' fontWeight='bold' mb={2}>
        {story?.title}
      </Typography>

      {/* Likes section */}
      <Stack direction='row' spacing={2} alignItems='center' mb={3}>
        <Typography>{story?.likes} Likes</Typography>
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

        <MarkdownRenderer>

          {story?.content || ''}
        </MarkdownRenderer>
  
  
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Comments */}
      <Typography variant='h5' mb={2}>
        Comments
      </Typography>

      <Box>
        {comments.length === 0 && <Typography>No comments yet</Typography>}

        {comments.map(c => (
          <Box
            key={c.id}
            sx={{ mb: 2, p: 2, border: '1px solid #333', borderRadius: 2 }}
          >
            <Typography fontWeight='bold'>{c.authorName}</Typography>
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
