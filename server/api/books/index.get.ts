import db from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  const { genreId, authorId } = getQuery(event)

  const queryParams: any = {}

  if (genreId) {
    queryParams.genreIds = {
      has: genreId,
    }
  }

  if (authorId) {
    queryParams.authorIds = {
      has: authorId,
    }
  }

  const books = await db.book.findMany({
    orderBy: {
      title: 'asc',
    },
    include: {
      authors: true,
      genres: true,
    },
    omit: {
      authorIds: true,
      genreIds: true,
    },
    where: queryParams,
  })
  return books
})
