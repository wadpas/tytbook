<template>
  <div class="flex flex-row">
    <NuxtImg
      :src="book.coverURLs[0]"
      :alt="book.title"
      width="300"
      class="aspect-[55/85] rounded-sm" />
    <div class="w-full px-2 py-2 space-y-2">
      <p class="font-semibold line-clamp-1">{{ book.title }}</p>
      <p class="line-clamp-1">{{ book.authors[0].name }}</p>
      <p class="line-clamp-1">{{ book.genres[0].name }}</p>
      <p class="">{{ book.description }}</p>
      <p class="">{{ book.price }} грн</p>
    </div>
    <div>
      <Button>Купити</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Book } from '~/types'

  const route = useRoute()
  const { data: book } = await useFetch<Book>(`/api/books/${route.params.slug}`)
</script>

<style scoped></style>
