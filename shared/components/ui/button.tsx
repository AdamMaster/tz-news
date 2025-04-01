import clsx from 'clsx'
import React from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  variant?: 'white' | 'black' | 'blue'
  isLoading?: boolean
}

export const Button: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  className,
  variant = 'white',
  isLoading,
  type,
  onClick
}) => {
  const types = {
    white: 'bg-white text-black hover:bg-amber-500',
    black: 'bg-black text-white hover:bg-amber-500',
    blue: 'bg-blue-500 text-white hover:bg-amber-500'
  }[variant!]

  return (
    <button
      className={clsx(
        className,
        'flex items-center justify-center h-[40px] px-4 rounded-[50px] cursor-pointer transition-all',
        isLoading && 'pointer-events-none',
        types
      )}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
