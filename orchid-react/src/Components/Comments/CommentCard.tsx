import type { CommentResponseDto } from '@/types/commentType'
import { Box, Button, ButtonGroup, Typography ,Stack} from '@mui/material'
import DeleteCommentDialog from './DeleteCommetDialog'
import EditCommentDialog from './EidtiComment'
import { useEffect, useState } from 'react'
import { ReplyItem } from './ReplyItem'
import ReplyDialog from './ReplyDailog'


interface commentCardProps {
  comment: CommentResponseDto
}

export default function CommentCard ({ comment }: commentCardProps) {
  const [openReplies, setOpenReplies] = useState(false)

  useEffect(() => {
    console.log('CommentCard mounted for comment id:', comment)
  }, [])

  return (
    <Box
      sx={{
        mb: 3,
        p: 2.5,
        borderRadius: 3,
        bgcolor: '#18121f',
        border: '1px solid #2a2235'
      }}
    >
      <Typography
        sx={{
          fontFamily: 'Cairo',
          color: '#e9dff1',
          mb: 1
        }}
      >
        {comment.content}
      </Typography>

      <Typography variant='caption' sx={{ color: '#a89fb3' }}>
        {new Date(comment.createdAt).toLocaleString()}
      </Typography>

      <Stack direction='row' spacing={1} mt={2}>
        <ReplyDialog comment={comment} />
        <EditCommentDialog comment={comment} />
        <DeleteCommentDialog comment={comment} />
      </Stack>

      {comment.replies?.length > 0 && (
        <Box sx={{ mt: 2, pl: 2, borderRight: '2px solid #2a2235' }}>
          {comment.replies.map(reply => (
            <ReplyItem key={reply.id} reply={reply} />
          ))}
        </Box>
      )}
    </Box>

    // <Box
    //   key={comment.id}
    //   sx={{ mb: 2, p: 2, border: '1px solid #333', borderRadius: 2 }}
    // >
    //   {/* <Typography fontWeight='bold'>{comment.authorId}</Typography> */}
    //   <Typography variant='subtitle2' color='gray' mb={1}>
    //     {/* @{comment.author.name */}
    //   </Typography>
    //   <Typography>{comment.content}</Typography>
    //   <Typography variant='caption' color='gray'>
    //     {comment.createdAt instanceof Date
    //       ? comment.createdAt.toLocaleString()
    //       : new Date(comment.createdAt).toLocaleString()}
    //   </Typography>
    //   <ReplyDialog comment={comment} />
    //   <EditCommentDialog comment={comment} />
    //   <DeleteCommentDialog comment={comment} />

    //   {comment.replies && comment.replies.length > 0 && (
    //     <button onClick={() => setOpenReplies(!openReplies)}>
    //       {openReplies
    //         ? 'Hide Replies'
    //         : `View Replies (${comment.replies.length})`}
    //     </button>
    //   )}

    //   {openReplies && (
    //     <Box sx={{ mt: 2, pl: 2, borderLeft: '1px solid #ccc' }}>
    //       {comment.replies.map(reply => (
    //         <ReplyItem key={reply.id} reply={reply} />
    //       ))}
    //     </Box>
    //   )}
    // </Box>
  )
}
