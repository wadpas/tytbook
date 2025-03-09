<template>
  <div class="mb-8">
    <h3 class="text-lg font-semibold">{{ name }}</h3>
    <hr class="my-4" />
    <div class="flex flex-wrap gap-2">
      <Badge
        v-for="(filter, i) in data"
        :key="i"
        :variant="route.query[valueKey] === filter.slug ? 'secondary' : 'outline'"
        @click="() => selectFilter(filter.slug)"
        class="px-2 py-1 font-medium cursor-pointer">
        {{ filter.name }}
      </Badge>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Badge from './ui/badge/Badge.vue'
  import type { Author, Genre } from '@prisma/client'

  interface FilterProps {
    data: (Author | Genre)[]
    name: string
    valueKey: string
  }

  const props = defineProps<FilterProps>()

  const route = useRoute()
  const router = useRouter()

  const selectFilter = (slug: string) => {
    const query = new URLSearchParams(route.query as Record<string, string>)
    if (query.has(props.valueKey) && query.get(props.valueKey) === slug) {
      query.delete(props.valueKey)
    } else {
      query.set(props.valueKey, slug)
    }
    router.push({
      path: route.path,
      query: Object.fromEntries(query.entries()),
    })
  }
</script>

<style lang="scss" scoped></style>
