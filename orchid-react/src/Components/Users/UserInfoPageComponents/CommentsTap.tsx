import type { CommentResponseDto } from "@/types/commentType"
import { Typography,  Stack,  Card,  CardContent } from "@mui/material"




export default function CommentsTab ({ comments }: { comments: CommentResponseDto[] }) {
  if (!comments.length) {
    return <Typography color='text.secondary'>No comments yet</Typography>
  }

  return (
    <Stack spacing={2}>
      {comments.map(comment => (
        <Card key={comment.id} variant='outlined' sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography>{comment.content}</Typography>
            <Typography variant='caption' color='text.secondary'>
              {new Date(comment.createdAt).toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  )
}
