import React from 'react'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  label?: string
}

const LoadingSpinner: React.FC<SpinnerProps> = ({
  size = 'md',
  label = 'Loading...'
}) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-[3px]',
    lg: 'w-12 h-12 border-4'
  }

  return (
    <div className='flex flex-col items-center justify-center gap-3 p-6'>
      <div className='relative'>
        {/* Outer Ring (Background) */}
        <div
          className={`${sizeClasses[size]} border-slate-200 rounded-full`}
        ></div>

        {/* Animated Inner Ring (Spinner) */}
        <div
          className={`absolute top-0 left-0 ${sizeClasses[size]} border-blue-600 border-t-transparent rounded-full animate-spin`}
        ></div>
      </div>

      {label && (
        <span className='text-sm font-medium text-slate-500 animate-pulse'>
          {label}
        </span>
      )}
    </div>
  )
}

export default LoadingSpinner
