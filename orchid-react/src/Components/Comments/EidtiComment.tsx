import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useAppDispatch, useAppSelector } from '@/Redux/hooks'
import {
  getCommentByIdSlice,
  UpdateCommentSlice
} from '@/Redux/slices/CommentSlice'
import { CiEdit } from 'react-icons/ci'
import type { CommentResponseDto } from '@/types/commentType'
import { getStoryByIdSlice } from '@/Redux/slices/storySlice'

interface EditCommentDialogProps {
  comment: CommentResponseDto
}

export default function EditCommentDialog ({ comment }: EditCommentDialogProps) {
  const [open, setOpen] = React.useState(false)
  const CommentState = useAppSelector(state => state.comment)
  const currentComment = CommentState.comment

  const dispatch = useAppDispatch()
  const [EditCommentValue, setEditComment] = React.useState(comment?.content)

  const handleClickOpen = () => {
    setEditComment(comment?.content)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // const formData = new FormData(event.currentTarget)
    // const formJson = Object.fromEntries((formData as any).entries())
    // const email = formJson.email
    // console.log(email)
    dispatch(
      UpdateCommentSlice({
        id: comment.id,
        commentData: { content: EditCommentValue }
      })
    ).then(() => {
      dispatch(getStoryByIdSlice(comment.storyId))
    })
    handleClose()
  }

  return (
    <React.Fragment>
      <Button variant='outlined' onClick={handleClickOpen}>
        <CiEdit />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Comment</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>{currentComment?.content}</DialogContentText> */}
          <form onSubmit={handleSubmit} id='subscription-form'>
            <TextField
              autoFocus
              required
              value={EditCommentValue}
              onChange={e => setEditComment(e.target.value)}
              margin='dense'
              id='name'
              name='comment'
              fullWidth
              variant='standard'
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button autoFocus type='submit' form='subscription-form'>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
