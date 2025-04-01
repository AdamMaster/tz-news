import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest, { params }: { params: { id: number } }) {
  try {
    const id = Number(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ message: 'Неверный ID' }, { status: 400 })
    }

    const { title, description } = await req.json()

    if (!title || !description) {
      return NextResponse.json({ message: 'Отсутствуют обязательные поля' }, { status: 400 })
    }

    const newsItem = await prisma.news.findUnique({ where: { id } })
    if (!newsItem) {
      return NextResponse.json({ message: 'Новости с таким ID не найдены' }, { status: 404 })
    }

    const updatedNews = await prisma.news.update({
      where: { id },
      data: { title, description }
    })

    return NextResponse.json(updatedNews)
  } catch (error) {
    console.error('[NEWS_PATCH] Server error', error)
    return NextResponse.json({ message: 'Ошибка на сервере' }, { status: 500 })
  }
}
