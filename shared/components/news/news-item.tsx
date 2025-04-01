import { News } from '@prisma/client'
import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui'
import { useStoreNews } from '@/shared/store/use-store-news'
import Link from 'next/link'
import { useStoreModal } from '@/shared/store'
import { NewsEditForm } from '../modals/contents/news-edit-form'

interface Props extends News {
  className?: string
}

export const NewsItem: React.FC<Props> = ({ className, id, title, description, createdAt }) => {
  const formattedDate = new Date(createdAt).toLocaleDateString('ru-RU')
  const { deleteNewsItems } = useStoreNews()
  const { setOpen } = useStoreModal()

  const handleClickButtonDelete = (id: number) => {
    deleteNewsItems(id)
  }

  const handleClickButtonEdit = () => {
    setOpen(<NewsEditForm newsId={id} currentTitle={title} currentDescription={description} />)
  }

  return (
    <Link
      href={`/news/${id}`}
      className={clsx(
        className,
        'relative overflow-hidden rounded-2xl shadow-md cursor-pointer transition-shadow hover:shadow-xl border-1 border-gray-100'
      )}
    >
      <div className='flex flex-col items-end gap-2 absolute top-4 right-4'>
        <button
          className=' cursor-pointer transition-colors text-sm hover:text-red-500'
          onClick={e => {
            e.preventDefault()
            handleClickButtonDelete(id)
          }}
        >
          Удалить
        </button>
        <button
          className='cursor-pointer transition-colors text-sm hover:text-red-500'
          onClick={e => {
            e.preventDefault()
            handleClickButtonEdit()
          }}
        >
          Редактировать
        </button>
      </div>
      <div className='p-6'>
        <div className='mb-10 text-sm text-gray-400'>{formattedDate}</div>
        <div className='sm:text-xl xs:text-lg sm:leading-7 xs:leading-7 font-medium mb-4 line-clamp-2'>{title}</div>
        <p className='line-clamp-4 text-gray-700 sm:leading-6 xs:leading-6'>{description}</p>
        <Button className='mt-7' variant='blue'>
          Подробнее
        </Button>
      </div>
    </Link>
  )
}
