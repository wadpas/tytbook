<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button class="rounded-full lg:hidden">
        <Icon
          name="lucide:settings-2"
          size="24" />
      </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader class="mb-6">
        <SheetTitle>Filters</SheetTitle>
      </SheetHeader>
      <Filter
        valueKey="genre"
        name="Жанри"
        :data="genres" />
      <Filter
        valueKey="author"
        name="Автори"
        :data="authors" />
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">
  import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
  import type { Author, Genre } from '@prisma/client'

  interface FilterProps {
    genres: Genre[]
    authors: Author[]
  }
  defineProps<FilterProps>()
</script>

<style scoped></style>
