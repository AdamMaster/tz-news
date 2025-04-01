'use client'

import clsx from 'clsx'
import React from 'react'
import { schema, Values } from './schemas'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Field } from '../../ui'
import { useStoreModal } from '@/shared/store'
import { useStoreNews } from '@/shared/store/use-store-news'
import { Api } from '@/shared/api/api-client'
import { CreateNewsValues } from '@/shared/api/news'

interface Props {
  className?: string
  newsId: number
  currentTitle: string
  currentDescription: string
}

export const NewsEditForm: React.FC<Props> = ({ className, newsId, currentTitle, currentDescription }) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const { setClose } = useStoreModal()
  const { updateNewsItems } = useStoreNews()

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: currentTitle,
      description: currentDescription
    }
  })

  const onSubmit = async (values: CreateNewsValues) => {
    try {
      await updateNewsItems(newsId, values)

      setClose()
    } catch (error) {
      console.error('Ошибка при добавлении новости:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={clsx(className, 'flex flex-col py-8 pt-0')}>
      <div className='mb-8 text-[1.5rem]'>Редактирование</div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-2'>
            <Field name='title' placeholder='Заголовок' />
            <Field name='description' placeholder='Текст' />
          </div>
          <Button className='mt-8' variant='black' type='submit' disabled={isLoading} isLoading={isLoading}>
            Редактировать новость
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}
