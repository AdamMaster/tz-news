import { z } from 'zod'

export const schema = z.object({
  title: z.string().min(2, { message: 'Поле должно содержать не менее 2-х символов' }),
  description: z.string().min(10, { message: 'Поле должно содержать не менее 10 символов' })
})

export type Values = z.infer<typeof schema>
