import StoryCard from './storyCard'

interface Props {}

function StoryList (props: Props) {
  const {} = props

  return (
    <div className='flex flex-wrap gap-4 justify-center'>
      <StoryCard />
      <StoryCard />
      <StoryCard />
      <StoryCard />
      <StoryCard />
    </div>
  )
}

export default StoryList
