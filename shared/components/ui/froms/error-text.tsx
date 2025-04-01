import React from 'react'
import s from './styles.module.css'
import clsx from 'clsx'

interface Props {
  text: string
  className?: string
}

export const ErrorText: React.FC<Props> = ({ text, className }) => {
  return <p className={clsx(className, 'mt-2 text-[12px] text-red-500')}>{text}</p>
}
