'use client'

import { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'
import { ErrorText } from './error-text'
import clsx from 'clsx'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  value?: string
  label?: string
  name: string
}

export const Field: React.FC<Props> = ({ name, placeholder, label, readOnly, className }) => {
  const {
    register,
    formState: { errors },
    watch
  } = useFormContext()

  const value = watch(name)
  const errorText = errors[name]?.message as string

  return (
    <div className={clsx(className, 'flex flex-col')}>
      {label && <div className='opacity-60 fz-[0.875rem] text-center'>{label}</div>}
      <input
        className={clsx(
          'w-full h-[45px] px-4 bg-gray-200 rounded-[50px] text-black border-1 border-transparent focus:outline-0',
          errors[name] && ' !border-red-500'
        )}
        type='text'
        value={value}
        placeholder={placeholder}
        autoComplete='off'
        readOnly={readOnly}
        {...register(name)}
      />
      <ErrorText text={errorText} />
    </div>
  )
}
