import { useAppDispatch, useAppSelector } from '@/Redux/hooks'
import StoryCard from './storyCard'
import { useEffect } from 'react'
import { getStoriesSummarySlice } from '@/Redux/slices/storySlice'
import { NavLink } from 'react-router'

interface Props {}

function StoryList (props: Props) {
  const {} = props

  const stroyApi = useAppSelector(state => state.story)
  const stories = stroyApi.storiesSummary || []

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getStoriesSummarySlice()).then(() => {
      console.log('Stories fetched:', stories)
    })
  }, [])

  return (
    <>
      <NavLink to='/'>
        <h1>Back to Home</h1>
      </NavLink>
    <div className='flex flex-wrap gap-4 justify-center'>
      {stories.map(story => (
        <StoryCard key={story.id} storySummaryForCard={story} />
      ))}
    </div>
      </>
  )
}

export default StoryList
