'use client'

import { News } from '@prisma/client'
import clsx from 'clsx'
import React, { useEffect } from 'react'
import { NewsItem } from './news-item'
import { useStoreModal } from '@/shared/store'
import { Button, Heading } from '../ui'
import { NewsAddForm } from '../modals/contents/news-add-form'
import { useStoreNews } from '@/shared/store/use-store-news'

interface Props {
  className?: string
  items: News[]
}

export const NewsList: React.FC<Props> = ({ className, items }) => {
  const { setOpen } = useStoreModal()
  const { itemsData, getNewsItems } = useStoreNews()

  const onClickAddButton = () => {
    setOpen(<NewsAddForm />)
  }

  const [loaded, setLoaded] = React.useState(false)

  React.useEffect(() => {
    getNewsItems().then(() => setLoaded(true))
  }, [])

  const newsItems = loaded ? itemsData : items

  return (
    <div>
      <div className='flex items-center justify-between lg:mb-15 md:mb-10 xs:mb-8'>
        <Heading level={1}>Новости</Heading>
        <div className='flex items-center gap-4'>
          <Button variant='black' onClick={() => onClickAddButton()}>
            Добавить новость
          </Button>
        </div>
      </div>
      <div className={clsx(className, 'sm:grid-cols-1 grid lg:grid-cols-3 gap-6')}>
        {newsItems.map(item => (
          <NewsItem {...item} key={item.id} />
        ))}
      </div>
    </div>
  )
}
