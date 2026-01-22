import type { CommentResponseDto } from "@/types/commentType"
import { Typography,Box } from "@mui/material"

type ReplyProps = {
  reply: CommentResponseDto
}




export const ReplyItem = ({ reply }: ReplyProps) => {
  return (
    <Box sx={{ mt: 1.5 }}>
      <Typography
        sx={{
          fontFamily: 'Cairo',
          color: '#f3d9fa',
          fontSize: '0.95rem'
        }}
      >
        {reply.content}
      </Typography>
    </Box>
  )
}






// export    const ReplyItem = ({ reply }: ReplyProps) => {
//   return (
   

// }

   
   
    // <div style={{ padding: '8px 0' }}>
    //   <strong>{reply.author.name}</strong>
    //   <p>{reply.content}</p>
    // </div>
//   )
// }
