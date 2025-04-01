'use client'

import React from 'react'
import { useStoreModal } from '@/shared/store'
import { X } from 'lucide-react'
import clsx from 'clsx'

export const Modal = () => {
  const { isOpen, content, setClose } = useStoreModal()
  const parentRef = React.useRef(null)
  const classNames = isOpen ? 'visible opacity-100' : 'hidden opacity-0'

  React.useEffect(() => {
    const onClickDocument = (e: MouseEvent) => {
      if (parentRef.current && e.target === parentRef.current) {
        setClose()
      }
    }

    const onEscapeKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setClose()
      }
    }

    document.addEventListener('mousedown', onClickDocument)
    document.addEventListener('keydown', onEscapeKeyDown)

    return () => {
      document.removeEventListener('mousedown', onClickDocument)
      document.removeEventListener('keydown', onEscapeKeyDown)
    }
  }, [])

  const onClickCloseButton = () => {
    setClose()
  }

  return (
    <div
      className={clsx(
        classNames,
        'flex flex-col items-center justify-center absolute top-0 left-0 w-full h-full bg-black/30 transition-all'
      )}
      ref={parentRef}
    >
      <div className='relative sm:w-[450px] xs:w-[360px] p-6 bg-white rounded-2xl'>
        {content}
        <div
          className='absolute top-3 right-3 flex items-center justify-center w-[25px] h-[25px] cursor-pointer'
          onClick={() => onClickCloseButton()}
        >
          <X width={20} color='#000' />
        </div>
      </div>
    </div>
  )
}
