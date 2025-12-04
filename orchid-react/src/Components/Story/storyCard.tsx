import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'

export default function StoryCard () {
  return (
    <Card
      sx={{
        maxWidth: 370,
        borderRadius: 3,
        boxShadow: 3,
        overflow: 'hidden',
        direction: 'rtl'
      }}
    >
      <CardMedia
        component='img'
        height='180'
        image='https://www.noor-book.com/publice/covers_cache_webp/2/5/3/a/07eecd4c8753a956d7ea1997deb1254e.jpg.webp'
        alt='story cover'
      />

      <CardContent sx={{ pb: 1 }}>
        <Typography variant='h5' fontWeight={700}>
          الرهان
        </Typography>

        <Typography variant='body2' sx={{ color: 'text.secondary', mt: 0.5 }}>
          صرخة من شمال غزة
        </Typography>
      </CardContent>

      {/* Likes + Comments */}
      <Box sx={{ px: 2, pb: 1 }}>
        <Stack direction='row' spacing={2} alignItems='center'>
          {/* Like */}
          <Stack direction='row' spacing={0.5} alignItems='center'>
            <IconButton size='small'>
              {/* <FavoriteBorderIcon fontSize='small' /> */}
            </IconButton>
            <Typography variant='body2'>123</Typography>
          </Stack>

          {/* Comments */}
          <Stack direction='row' spacing={0.5} alignItems='center'>
            <IconButton size='small'>
              {/* <ChatBubbleOutlineIcon fontSize='small' /> */}
            </IconButton>
            <Typography variant='body2'>45</Typography>
          </Stack>
        </Stack>
      </Box>

      <CardActions
        sx={{ direction: 'ltr', justifyContent: 'flex-end', px: 2, pb: 2 }}
        className='hover:bg-gray-100'
      >
        <Button size='small' sx={{ fontWeight: 'bold' }}>
          مشاركة
        </Button>
        <Button size='small' sx={{ fontWeight: 'bold' }}>
          قراءة
        </Button>
      </CardActions>
    </Card>
  )
}
