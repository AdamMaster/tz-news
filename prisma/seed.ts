import { prisma } from './prisma-client'
import { news } from './constants'

async function up() {
  await prisma.news.createMany({
    data: news
  })
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "News" RESTART IDENTITY CASCADE`
}

async function main() {
  try {
    await down()
    await up()
  } catch (e) {
    console.error(e)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
