import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const newsItems = await prisma.news.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(newsItems)
  } catch (error) {
    console.error('[NEWS_GET] Server error', error)
    return NextResponse.json({ message: 'Ошибка на сервере' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, description } = await req.json()

    const news = await prisma.news.create({
      data: { title, description }
    })

    return NextResponse.json(news)
  } catch (error) {
    console.error('[NEWS_POST] Server error', error)
    return NextResponse.json({ message: 'Ошибка на сервере' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json()

    const deletedNews = await prisma.news.delete({
      where: { id }
    })

    return NextResponse.json(deletedNews)
  } catch (error) {
    console.error('[NEWS_DELETE] Server error', error)
    return NextResponse.json({ message: 'Ошибка на сервере' }, { status: 500 })
  }
}
