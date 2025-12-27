import type { CommentResponseDto } from "@/types/commentType"

type ReplyProps = {
  reply: CommentResponseDto
}

export    const ReplyItem = ({ reply }: ReplyProps) => {
  return (
    <div style={{ padding: '8px 0' }}>
      <strong>{reply.author.name}</strong>
      <p>{reply.content}</p>
    </div>
  )
}
