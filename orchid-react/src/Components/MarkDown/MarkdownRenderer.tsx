import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface MarkdownRendererProps {
  children: string
}

export default function MarkdownRenderer ({ children }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code (props) {
          const { className, children, ...rest } = props

          // حل inline
          const inline = (props as any).inline

          const match = /language-(\w+)/.exec(className || '')

          return !inline && match ? (
            <SyntaxHighlighter
              style={dracula}
              language={match[1]}
              PreTag='div'
              {...rest}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...rest}>
              {children}
            </code>
          )
        },

        p (props) {
          const { children, ...rest } = props

          return (
            <p
              style={{ marginBottom: '0.5rem', whiteSpace: 'pre-line' }}
              {...rest}
            >
              {children}
            </p>
          )
        }
      }}
    >
      {children}
    </ReactMarkdown>
  )
}
