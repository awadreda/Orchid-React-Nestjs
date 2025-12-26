import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { MdDeleteOutline } from 'react-icons/md'
import { useAppDispatch, useAppSelector } from '@/Redux/hooks'
import { deleteCommentSlice } from '@/Redux/slices/CommentSlice'
import { getStoryByIdSlice } from '@/Redux/slices/storySlice'
import type { CommentResponseDto } from '@/types/commentType'

interface DeleteCommentDialogProps {
  comment : CommentResponseDto
}
export default function DeleteCommentDialog ({
  comment
}: DeleteCommentDialogProps) {
  const [open, setOpen] = React.useState(false)

  const CommentState = useAppSelector(state => state.comment)
  const Comments = CommentState.comments
  const dispatch = useAppDispatch()

  const handleDeleteComment = () => {
    dispatch(deleteCommentSlice(comment.id)).then(() => {
      dispatch(getStoryByIdSlice(comment.storyId))
    })
    setOpen(false)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <React.Fragment>
      <Button variant='outlined' onClick={handleClickOpen}>
        <MdDeleteOutline />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete this comment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDeleteComment()
              handleClose()
            }}
            sx={{ color: 'error.main' }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
