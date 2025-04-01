import { prisma } from '@/prisma/prisma-client'
import { Container } from '@/shared/components'
import { Button, Heading } from '@/shared/components/ui'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function NewsDetailsPage({ params: { id } }: { params: { id: number } }) {
  if (!id || isNaN(Number(id))) {
    return notFound()
  }

  const newsItem = await prisma.news.findFirst({
    where: {
      id: Number(id)
    }
  })

  if (!newsItem) {
    return notFound()
  }

  const formattedDate = new Date(newsItem.createdAt).toLocaleDateString('ru-RU')

  return (
    <div className='sm:p-6 xs:p-4'>
      <Container>
        <Heading className='md:mb-8 xs:mb-6 xs:!text-[1.8rem]' level={1}>
          Детальная страница новости
        </Heading>
        <div className='p-4 bg-gray-50 rounded-2xltext-gray-700'>
          <div className='mb-4 text-sm text-gray-400'>{formattedDate}</div>
          <div className='xs:text-lg font-medium mb-4'>{newsItem.title}</div>
          <p>{newsItem.description}</p>
        </div>

        <Link
          className='!flex items-center justify-center w-max h-[40px] px-10 mt-[30px] bg-black rounded-[50px] text-white'
          href={'/'}
        >
          Назад
        </Link>
      </Container>
    </div>
  )
}
