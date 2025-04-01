import { axiosInstance } from './instance'

export interface CreateNewsValues {
  title: string
  description: string
}

export const getNews = async () => {
  const { data } = await axiosInstance.get('/news')

  return data
}

export const addNews = async (values: CreateNewsValues) => {
  const { data } = await axiosInstance.post('/news', values)

  return data
}

export const deleteNews = async (id: number) => {
  const { data } = await axiosInstance.delete('/news', { data: { id } })
  return data
}

export const updateNews = async (id: number, values: CreateNewsValues) => {
  const { data } = await axiosInstance.patch(`/news/${id}`, values)

  return data
}
