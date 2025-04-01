import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id)
    const { title, description } = await req.json()

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
