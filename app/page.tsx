import { prisma } from '@/prisma/prisma-client'
import { Container } from '@/shared/components'
import { NewsList } from '@/shared/components/news'
import { Button, Heading } from '@/shared/components/ui'

export default async function Home() {
  const newsItems = await prisma.news.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div className='py-6'>
      <Container>
        <div className='flex flex-col'>
          <NewsList items={newsItems} />
        </div>
      </Container>
    </div>
  )
}
