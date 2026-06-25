import { use, useEffect, useState } from 'react'
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
import { FaHeart } from 'react-icons/fa' //fild
import { FaRegHeart } from 'react-icons/fa'

import MarkdownRenderer from '../../Components/MarkDown/MarkdownRenderer'
import { useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from '@/Redux/hooks'
import { getStoryByIdSlice } from '@/Redux/slices/storySlice'
import ReturnHome from '@/Components/Home/ReturnHome'
import AddComment from '@/Components/Comments/AddComment'
import CommentCard from '@/Components/Comments/CommentCard'
import { addLikeThunk, removeLikeThunk } from '@/Redux/slices/LikeSlice'

export default function StoryReadingPage () {
  const { storyId } = useParams()
  const [loading, setLoading] = useState(true)
  const [isReading, setIsReading] = useState(false)

  const [isLiked, setIsLiked] = useState(false)

  const dispatch = useAppDispatch()
  const stroyApi = useAppSelector(state => state.story)
  const story = stroyApi.CurrentStory
  const [likesCount, setLikesCount] = useState(story?.likes.length || 0)

  const checkUserLikedStory = () => {
    const liked = story?.likes.some(like => like.userId === 1)

    console.log('User liked story:', liked)

    setIsLiked(liked ? liked : false)
  }

  const handleLikeButtonClick = () => {
    if (isLiked) {
      // Dispatch the unlike action
      dispatch(removeLikeThunk({ storyId: Number(storyId), userId: 1 }))
      setLikesCount(likesCount - 1)
      console.log('Unliked')
    } else {
      // Dispatch the like action
      dispatch(addLikeThunk({ storyId: Number(storyId), userId: 1 }))
      setLikesCount(likesCount + 1)
      console.log('Liked')
    }
    setIsLiked(!isLiked)
  }

  useEffect(() => {
    dispatch(getStoryByIdSlice(Number(storyId)))
      .unwrap()
      .then(() => {
        setLoading(false)
        // checkUserLikedStory()
      })
  }, [dispatch, storyId])

  useEffect(() => {
    if (story) {
      checkUserLikedStory()
      setLikesCount(story.likes.length)
    }
  }, [story])

  if (loading)
    return (
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: '#0f0b14',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <CircularProgress sx={{ color: '#c084fc' }} />
      </Box>
    )

  return (
    <Box
      sx={{ minHeight: '100vh', bgcolor: '#0f0b14', color: '#e9dff1', py: 6 }}
    >
      <Box sx={{ maxWidth: 820, mx: 'auto', px: 2, direction: 'rtl' }}>
        {/* عنوان القصة */}
        <Typography
          variant='h4'
          sx={{
            fontFamily: 'Cairo',
            fontWeight: 700,
            color: '#f3d9fa',
            mb: 2
          }}
        >
          {story?.title}
        </Typography>

        {/* شريط التحكم */}
        <Stack direction='row' spacing={2} alignItems='center' mb={3}>
          <ReturnHome />

          <Typography sx={{ color: '#a89fb3' }}>{likesCount} إعجاب</Typography>

          <Button
            size='small'
            sx={{
              bgcolor: 'rgba(192,132,252,0.15)',
              color: '#c084fc',
              borderRadius: 3,
              fontFamily: 'Cairo'
            }}
            onClick={() => {
              handleLikeButtonClick()
            }}
          >
            {isLiked ? <FaHeart /> : <FaRegHeart />}
          </Button>
        </Stack>

        <Divider sx={{ borderColor: '#2a2235', my: 3 }} />

        {/* زر القراءة */}

        {/* محتوى القصة */}
        {isReading ? (
          <Box
            sx={{
              fontSize: '18px',
              lineHeight: 1.9,
              fontFamily: 'Cairo',
              color: '#e9dff1'
            }}
          >
            <MarkdownRenderer>{story?.content || ''}</MarkdownRenderer>
          </Box>
        ) : (
          <Box
            sx={{
              fontSize: '18px',
              lineHeight: 1.9,
              fontFamily: 'Cairo',
              color: '#e9dff1',
              height: 200,
              overflow: 'hidden'
            }}
          >
            <MarkdownRenderer>{story?.content || ''}</MarkdownRenderer>
          </Box>
        )}

        {!isReading && (
          <Box textAlign='center' mb={4}>
            <Button
              onClick={() => setIsReading(true)}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 4,
                fontFamily: 'Cairo',
                color: '#f3d9fa',
                border: '1px solid rgba(243,217,250,0.3)',
                backdropFilter: 'blur(6px)',
                bgcolor: 'rgba(255,255,255,0.05)'
              }}
            >
              أكمل القراءة
            </Button>
          </Box>
        )}

        <Divider sx={{ borderColor: '#2a2235', my: 6 }} />

        {/* التعليقات */}
        <Typography
          variant='h5'
          sx={{
            fontFamily: 'Cairo',
            color: '#f3d9fa',
            mb: 3
          }}
        >
          التعليقات
        </Typography>

        <AddComment userId={1} storyId={Number(storyId)} />

        {story?.comments.length === 0 && (
          <Typography sx={{ color: '#a89fb3', mt: 2 }}>
            لا توجد تعليقات بعد
          </Typography>
        )}

        {story?.comments.map(c => {
          if (c.parentCommentId === null) {
            return <CommentCard key={c.id} comment={c} />
          }
        })}

        {/* زر صعود */}
        <Box textAlign='center' mt={6}>
          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            sx={{
              color: '#a89fb3',
              fontFamily: 'Cairo'
            }}
          >
            ↑ العودة للأعلى
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

// export default function StoryReadingPage () {
//   const { storyId } = useParams()

//   const [loading, setLoading] = useState(true)

//   const dispatch = useAppDispatch()
//   const stroyApi = useAppSelector(state => state.story)
//   const story = stroyApi.CurrentStory

//   const commentApi = useAppSelector(state => state.comment)
//   const comments = commentApi.comments

//   useEffect(() => {
//     dispatch(getStoryByIdSlice(Number(storyId))).then(() => {
//       setLoading(false)
//       console.log('Story fetched:', story)
//     })
//   }, [dispatch, storyId ])

//   if (loading) return <CircularProgress />

//   return (
//     <Box sx={{ maxWidth: '800px', mx: 'auto', mt: 4 }}>
//       {/* Title */}

//       <Typography variant='h4' fontWeight='bold' mb={2}>
//         {story?.title}
//       </Typography>

//       {/* Likes section */}
//       <Stack direction='row' spacing={2} alignItems='center' mb={3}>
//         <ReturnHome />

//         <Typography>{story?.likes.length} Likes</Typography>
//         <Button variant='contained' size='small'>
//           Like
//         </Button>
//       </Stack>

//       <Divider sx={{ my: 2 }} />

//       {/* Markdown Content */}
//       <Box sx={{ mt: 2, fontSize: '18px', lineHeight: 1.8 }}>
//         {/* <ReactMarkdown remarkPlugins={[remarkGfm]}>
//           {story?.content || ''}
// </ReactMarkdown> */}

//         <MarkdownRenderer>{story?.content || ''}</MarkdownRenderer>
//       </Box>

//       <Divider sx={{ my: 4 }} />

//       {/* Comments */}
//       <Typography variant='h5' mb={2}>
//         Comments
//       </Typography>

//       <Box>
//         {story?.comments.length === 0 && (
//           <Typography>No comments yet</Typography>
//         )}

//         <AddComment userId={1} storyId={Number(storyId)} />

//         {story?.comments.map(c => (
//           <CommentCard key={c.id} comment={c} />
//         ))}
//       </Box>
//     </Box>
//   )
// }
