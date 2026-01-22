






import { Box, Container, Typography } from '@mui/material'
import { NavLink } from 'react-router'
import StoryCard from './storyCard'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/Redux/hooks'
import { getStoriesSummarySlice } from '@/Redux/slices/storySlice'

function StoryList () {
  const stroyApi = useAppSelector(state => state.story)
  const stories = stroyApi.storiesSummary || []
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getStoriesSummarySlice())
  }, [])

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#0f0b14',
        direction: 'rtl',
        py: 6
      }}
    >
      <Container maxWidth='lg'>
        {/* عنوان الصفحة */}
        <Typography
          variant='h4'
          sx={{
            fontFamily: 'Cairo',
            fontWeight: 700,
            color: '#f3d9fa',
            textAlign: 'center',
            mb: 1
          }}
        >
          القصص
        </Typography>

        <Typography
          sx={{
            fontFamily: 'Cairo',
            color: '#a89fb3',
            textAlign: 'center',
            mb: 4
          }}
        >
          اختر قصة… واترك الكلمات تقودك
        </Typography>

        {/* رجوع */}
        <Box textAlign='center' mb={4}>
          <NavLink to='/' style={{ color: '#c084fc' }}>
            العودة إلى الصفحة الرئيسية
          </NavLink>
        </Box>

        {/* الكروت */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3,
            justifyContent: 'center'
          }}
        >
          {stories.map(story => (
            <StoryCard key={story.id} storySummaryForCard={story} />
          ))}
        </Box>
      </Container>
    </Box>
  )
}

export default StoryList





// import { useAppDispatch, useAppSelector } from '@/Redux/hooks'
// import StoryCard from './storyCard'
// import { useEffect } from 'react'
// import { getStoriesSummarySlice } from '@/Redux/slices/storySlice'
// import { NavLink } from 'react-router'

// interface Props {}

// function StoryList (props: Props) {
//   const {} = props

//   const stroyApi = useAppSelector(state => state.story)
//   const stories = stroyApi.storiesSummary || []

//   const dispatch = useAppDispatch()

//   useEffect(() => {
//     dispatch(getStoriesSummarySlice()).then(() => {
//       console.log('Stories fetched:', stories)
//     })
//   }, [])

//   return (
//     <>
//       <NavLink to='/'>
//         <h1>Back to Home</h1>
//       </NavLink>
//     <div className='flex flex-wrap gap-4 justify-center'>
//       {stories.map(story => (
//         <StoryCard key={story.id} storySummaryForCard={story} />
//       ))}
//     </div>
//       </>
//   )
// }

// export default StoryList
