import type { Author, Genre } from '@prisma/client'

export type APIError = {
  statusCode: number
  statusMessage: string
  message: string
  data?: Record<string, string>
}

export type RouteParams = {
  genreId: string
  bookId: string
  slug: string
}

export type Book = {
  id: string
  title: string
  slug: string
  authors: Author[]
  genres: Genre[]
  description: string
  coverURLs: string[]
  year: number
  pages: number
  price: number
  isFeatured: boolean
  isAvailable: boolean
}
