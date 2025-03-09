<template>
  <div class="lg:grid lg:grid-cols-5 lg:gap-x-8">
    <MobileFilters
      :genres="genres"
      :authors="authors">
    </MobileFilters>
    <div class="hidden lg:block">
      <Filter
        valueKey="genre"
        name="Жанри"
        :data="genres" />
      <Filter
        valueKey="author"
        name="Автори"
        :data="authors" />
    </div>
    <div class="lg:col-span-4">
      <BookGrid :books="books" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Author, Genre } from '@prisma/client'
  import type { Book } from '~/types'

  const route = useRoute()

  const { data: cachedGenres } = useNuxtData('genres')
  const { data: genres, status: genreStatus } = await useFetch<Genre[]>(`/api/genres`, {
    default: () => cachedGenres.value,
    key: 'genres',
  })

  const { data: cachedAuthors } = useNuxtData('authors')
  const { data: authors } = await useFetch<Author[]>(`/api/authors`, {
    default: () => cachedAuthors.value,
    key: 'authors',
  })

  const genreId = computed(() => genres.value?.find((genre: Genre) => genre.slug === route.query.genre)?.id)
  const authorId = computed(() => authors.value?.find((author: Author) => author.slug === route.query.author)?.id)

  const { data: books } = await useFetch<Book[]>(`/api/books`, {
    lazy: true,
    query: {
      genreId,
      authorId,
    },
  })
</script>

<style lang="scss" scoped></style>
