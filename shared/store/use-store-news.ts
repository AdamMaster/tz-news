import { News } from '@prisma/client'
import { create } from 'zustand'
import { CreateNewsValues } from '../api/news'
import { Api } from '../api/api-client'

interface State {
  itemsData: News[]
  loading: boolean
  getNewsItems: () => Promise<void>
  addNewsItems: (values: CreateNewsValues) => Promise<void>
  deleteNewsItems: (id: number) => Promise<void>
  updateNewsItems: (id: number, updatedData: CreateNewsValues) => Promise<void>
}

export const useStoreNews = create<State>(set => ({
  itemsData: [],
  loading: false,
  getNewsItems: async () => {
    try {
      set({ loading: true })
      const data = await Api.news.getNews()
      set({ itemsData: data })
    } catch (error) {
      console.error(error)
    } finally {
      set({ loading: false })
    }
  },
  addNewsItems: async (values: CreateNewsValues) => {
    try {
      set({ loading: true })

      const newNews = await Api.news.addNews(values)

      set(state => ({
        itemsData: [{ ...newNews }, ...state.itemsData]
      }))
    } catch (error) {
      console.error('Ошибка при добавлении новости:', error)
    } finally {
      set({ loading: false })
    }
  },
  deleteNewsItems: async (id: number) => {
    try {
      set({ loading: true })

      const deletedNews = await Api.news.deleteNews(id)

      set(state => ({
        itemsData: state.itemsData.filter(item => item.id !== id)
      }))
    } catch (error) {
      console.error('Ошибка при добавлении новости:', error)
    } finally {
      set({ loading: false })
    }
  },
  updateNewsItems: async (id: number, updatedData: CreateNewsValues) => {
    try {
      set({ loading: true })
      const updatedNews = await Api.news.updateNews(id, updatedData)

      set(state => ({
        itemsData: state.itemsData.map(item => (item.id === id ? { ...item, ...updatedNews } : item))
      }))
    } catch (error) {
      console.error('Ошибка при редактировании новости:', error)
    } finally {
      set({ loading: false })
    }
  }
}))
