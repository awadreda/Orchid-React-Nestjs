// import { NavLink } from 'react-router'

// interface HomePageProps {}

// export default function HomePage () {
//   return (
//     <>
//       <div>Welcome to the Home Page</div>

//       <NavLink to='/stories'>Go to Stories</NavLink>
//       <br />
//       <NavLink to='/addnewstory'>Add New Story</NavLink>
//       <br />
//       <NavLink to='/usersTable'>Users Table</NavLink>
//       <br />
//       <NavLink to='/users/u123'>User Info</NavLink>
//     </>
//   )
// }


import { NavLink } from 'react-router'
import { Box, Button, Container, Stack, Typography, Paper } from '@mui/material'

export default function HomePage () {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        minWidth: '100vw',
        bgcolor: '#faf7fb',
        margin: '-8px',
        direction: 'rtl',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Container maxWidth='md'>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            bgcolor: 'rgba(255,255,255,0.85)'
          }}
        >
          <Stack spacing={4} alignItems='center' textAlign='center'>
            {/* العنوان */}
            <Typography
              variant='h3'
              sx={{
                fontFamily: 'Cairo',
                fontWeight: 700,
                color: '#6a1b9a'
              }}
            >
              مدونة أوركيد
            </Typography>

            {/* وصف */}
            <Typography
              sx={{
                fontFamily: 'Cairo',
                fontSize: '1.1rem',
                color: '#555',
                maxWidth: 500
              }}
            >
              مساحة هادئة لقراءة القصص، حيث الكلمات تنمو مثل زهور الأوركيد.
            </Typography>

            {/* اقتباس */}
            <Box
              sx={{
                borderRight: '4px solid #ce93d8',
                pr: 2,
                maxWidth: 500
              }}
            >
              <Typography
                sx={{
                  fontFamily: 'Cairo',
                  fontStyle: 'italic',
                  color: '#7b1fa2'
                }}
              >
                "بعض القصص لا تُقرأ… بل تُشعَر."
              </Typography>
            </Box>

            {/* الأزرار */}
            <Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' ,gap:2}} direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                component={NavLink}
                to='/stories'
                variant='contained'
                sx={{
                  bgcolor: '#8e24aa',
                  px: 4,
                  fontFamily: 'Cairo',
                  borderRadius: 3,
                  '&:hover': {
                    bgcolor: '#7b1fa2'
                  }
                }}
              >
                اقرأ القصص
              </Button>

              <Button
                component={NavLink}
                to='/addnewstory'
                variant='outlined'
                sx={{
                  color: '#8e24aa',
                  borderColor: '#ce93d8',
                  px: 4,
                  fontFamily: 'Cairo',
                  borderRadius: 3,
                  '&:hover': {
                    borderColor: '#8e24aa',
                    bgcolor: '#f3e5f5'
                  }
                }}
              >
                أضف قصتك
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}
