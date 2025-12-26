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
      username:'Awad',
      authorId: 1
    }

    dispatch(CreateCommentSlice(newComment))
    setComment('')
    
  }

  return (
    <div>
      <label>اضف تعليق:</label>
      <textarea 
        className='border border-gray-300 rounded-md p-2 w-full'
        value={comment}
        onChange={e => setComment(e.target.value)}
      ></textarea>
      <button className='bg-blue-700 text-white p-2 rounded-2xl' onClick={handleCommentSubmit}>ارسال</button>
    </div>
  )
}
