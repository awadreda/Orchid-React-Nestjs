import React from 'react'
import { AlertCircle, XCircle } from 'lucide-react' // Optional: npm i lucide-react

interface ErrorProps {
  message?: string | null
}

const ErrorMessage: React.FC<ErrorProps> = ({ message }) => {
  if (!message) return null

  return (
    <div className='flex items-center gap-3 p-4 my-4 border-l-4 border-red-500 rounded-r-lg bg-red-50/50 backdrop-blur-sm animate-in fade-in slide-in-from-top-1'>
      <AlertCircle className='w-5 h-5 text-red-500 shrink-0' />
      <div className='flex flex-col'>
        <span className='text-sm font-semibold text-red-800'>System Error</span>
        <p className='text-sm text-red-700/90'>{message}</p>
      </div>
    </div>
  )
}

export default ErrorMessage


