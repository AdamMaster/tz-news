'use client'

import clsx from 'clsx'
import React from 'react'
import { schema, Values } from './schemas'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Field } from '../../ui'
import { addNews } from '@/shared/api/news'
import { useStoreModal } from '@/shared/store'
import { useStoreNews } from '@/shared/store/use-store-news'

interface Props {
  className?: string
}

export const NewsAddForm: React.FC<Props> = ({ className }) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const { setClose } = useStoreModal()
  const { itemsData, addNewsItems, getNewsItems } = useStoreNews()

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: ''
    }
  })

  const onSubmit = async (data: Values) => {
    setIsLoading(true)

    try {
      await addNewsItems(data)

      setClose()
    } catch (error) {
      console.error('Ошибка при добавлении новости:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={clsx(className, 'flex flex-col py-8')}>
      <div className='mb-8 text-[1.5rem]'>Добавление</div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-2'>
            <Field name='title' placeholder='Заголовок' />
            <Field name='description' placeholder='Текст' />
          </div>
          <Button className='mt-8' variant='black' type='submit' disabled={isLoading} isLoading={isLoading}>
            Добавить новость
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}
