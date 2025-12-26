import type { CommentResponseDto } from '@/types/commentType'
import { Box, Typography } from '@mui/material'
import DeleteCommentDialog from './DeleteCommetDialog'
import EditCommentDialog from './EidtiComment'
import { useEffect } from 'react'

interface commentCardProps {
  comment: CommentResponseDto
}

export default function CommentCard ({ comment }: commentCardProps) {
  useEffect(() => {
    // This effect runs when the component mounts and when the comment prop changes
    console.log('CommentCard mounted or comment changed:', comment)
  }, [comment.content])

  return (
    <Box
      key={comment.id}
      sx={{ mb: 2, p: 2, border: '1px solid #333', borderRadius: 2 }}
    >
      {/* <Typography fontWeight='bold'>{comment.authorId}</Typography> */}
      <Typography variant='subtitle2' color='gray' mb={1}>
        @{comment.username}
      </Typography>
      <Typography>{comment.content}</Typography>
      <Typography variant='caption' color='gray'>
        {comment.createdAt instanceof Date
          ? comment.createdAt.toLocaleString()
          : new Date(comment.createdAt).toLocaleString()}
      </Typography>

      <EditCommentDialog comment={comment} />

      <DeleteCommentDialog comment={comment} />
    </Box>
  )
}
