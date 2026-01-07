import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { MdDelete } from 'react-icons/md'
import { useAppDispatch } from '@/Redux/hooks'
import { deleteUserSlice } from '@/Redux/slices/UsersSlice'

export default function DeleteUserDialog ({
  userId,
  userName
}: {
  userId: number
  userName: string
}) {
  const [open, setOpen] = React.useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const dispatch = useAppDispatch()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    // Dispatch delete action

    dispatch(deleteUserSlice(userId))

    setOpen(false)
  }

  return (
    <React.Fragment>
      <Button variant='outlined' onClick={handleClickOpen}>
        <MdDelete />
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title'>
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {userName}? with ID {userId}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button color='error' onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
