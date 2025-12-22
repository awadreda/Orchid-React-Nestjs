import { useAppDispatch, useAppSelector } from '@/Redux/hooks'
import { CreateCommentSlice } from '@/Redux/slices/CommentSlice'
import type { CreateCommentDto } from '@/types/commentType'
import { use, useState } from 'react'

interface AddCommentProps {
  storyId: number
  userId: number
}

export default function AddComment ({ storyId }: AddCommentProps) {
  const [comment, setComment] = useState('')

  const dispatch = useAppDispatch()

  const commentApi = useAppSelector(state => state.comment)

  const Comments = commentApi.comments

  const handleCommentSubmit = () => {
    const newComment: CreateCommentDto = {
      content: comment,
      storyId: storyId,
      authorId: 1
    }

    dispatch(CreateCommentSlice(newComment))
  }

  return (
    <div>
      <label>اضف تعليق:</label>
      <textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
      ></textarea>
      <button onClick={handleCommentSubmit}>ارسال</button>
    </div>
  )
}
