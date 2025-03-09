<template>
  <div>
    <div class="flex items-center justify-between">
      <Heading
        title="Книга"
        description="Введіть інформацію для створення/редагування книги">
        <Button
          v-if="isEditing"
          @click="isModalVisible = true"
          variant="destructive">
          <Icon
            size="20"
            name="radix-icons:trash" />
          Видалити
        </Button>
      </Heading>
    </div>
    <Separator class="my-4" />
    <form
      @submit="onSubmit"
      class="w-full space-y-8">
      <div class="gap-8 md:grid md:grid-cols-3">
        <FormField
          v-slot="{ componentField }"
          name="title">
          <FormItem>
            <FormLabel>Назва</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Дюна"
                v-bind="componentField" />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="authorIds">
          <FormItem>
            <FormLabel>Автор</FormLabel>
            <div class="flex">
              <Select
                :multiple="true"
                v-bind="componentField">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Виберіть автора" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="author in authors"
                      :key="author.id"
                      :value="author.id">
                      {{ author.name }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button
                type="button"
                @click="$router.push('/admin/authors/new')">
                +
              </Button>
            </div>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="genreIds">
          <FormItem>
            <FormLabel>Жанр</FormLabel>
            <div class="flex">
              <Select
                :multiple="true"
                v-bind="componentField">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Виберіть жанр" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      multiple="true"
                      v-for="genre in genres"
                      :key="genre.id"
                      :value="genre.id">
                      {{ genre.name }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button
                type="button"
                @click="$router.push('/admin/genres/new')">
                +
              </Button>
            </div>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="description">
          <FormItem>
            <FormLabel>Опис</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Про книгу"
                v-bind="componentField" />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="pages">
          <FormItem>
            <FormLabel>Кількість сторінок</FormLabel>
            <FormControl>
              <Input
                type="number"
                v-bind="componentField" />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="price">
          <FormItem>
            <FormLabel>Ціна</FormLabel>
            <FormControl>
              <Input
                type="number"
                v-bind="componentField" />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="year">
          <FormItem>
            <FormLabel>Рік видання</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="2020"
                v-bind="componentField" />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ value, handleChange }"
          name="isFeatured">
          <FormItem class="flex flex-row items-start p-2 mt-8 space-y-0 border rounded-md shadow-sm h-9 gap-x-3">
            <FormControl>
              <Checkbox
                :model-value="value"
                @update:model-value="handleChange" />
            </FormControl>
            <div class="space-y-1 leading-none">
              <FormLabel>Акція</FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ value, handleChange }"
          name="isAvailable">
          <FormItem class="flex flex-row items-start p-2 mt-8 space-y-0 border rounded-md shadow-sm h-9 gap-x-3">
            <FormControl>
              <Checkbox
                :model-value="value"
                @update:model-value="handleChange" />
            </FormControl>
            <div class="space-y-1 leading-none">
              <FormLabel>В наявності</FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        </FormField>
      </div>
      <FormField
        v-slot="{ componentField }"
        name="coverURLs">
        <FormItem>
          <FormLabel>Обкладинка</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="URL"
              v-bind="componentField" />
          </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      </FormField>
      <div class="flex justify-end">
        <Button type="submit"> Зберегти </Button>
        <Button
          class="ml-4"
          type="button"
          @click="$router.back()">
          Скасувати
        </Button>
      </div>
    </form>
  </div>
  <AlertModal
    :isModalVisible="isModalVisible"
    @on-close="isModalVisible = false"
    @on-confirm="deleteBook">
  </AlertModal>
</template>

<script setup lang="ts">
  import type { APIError, Author, Book, Genre } from '~/types'
  import { toTypedSchema } from '@vee-validate/zod'
  import { useForm } from 'vee-validate'
  import { bookSchema } from '~/server/utils/validations'
  import { toast } from '~/components/ui/toast'

  const isEditing = ref(true)
  const isModalVisible = ref(false)
  const router = useRouter()
  const route = useRoute()

  const { data: currentBook } = await useFetch<Book>(`/api/books/${route.params.slug}`)
  const { data: authors } = await useFetch<Author[]>(`/api/authors`)
  const { data: genres } = await useFetch<Genre[]>(`/api/genres`)

  watchEffect(() => {
    if (route.params.slug === 'new') {
      isEditing.value = false
    } else if (!currentBook.value) {
      navigateTo('/admin/books')
    }
  })

  const formSchema = toTypedSchema(bookSchema)
  const form = useForm({
    validationSchema: formSchema,
    // @ts-ignore
    initialValues: currentBook.value || {
      title: '',
      authorIds: [],
      genreIds: [],
      description: '',
      pages: 500,
      price: 399,
      year: 2020,
      isFeatured: true,
      isAvailable: true,
      coverURLs: [],
    },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    values.price = Math.max(Math.floor(values.pages - Math.random() * 200), 199)
    try {
      if (isEditing.value) {
        await $fetch(`/api/books/${route.params.slug}`, {
          method: 'PATCH',
          body: values,
        })
      } else {
        await $fetch('/api/books', {
          method: 'POST',
          body: values,
        })
      }
      router.back()
      toast({
        title: 'Операція успішна',
        description: 'Всі дані були успішно збережені',
      })
    } catch (error: unknown) {
      const err = error as APIError
      toast({
        variant: 'destructive',
        title: ` Помилка ${err.statusCode}`,
        description: err.message,
      })
    } finally {
    }
  })

  const deleteBook = async () => {
    try {
      await $fetch(`/api/books/${route.params.slug}`, {
        method: 'DELETE',
      })
      navigateTo('/admin/books')
      toast({
        title: 'Операція успішна',
        description: 'Дані були успішно видалені',
      })
    } catch (error: unknown) {
      const err = error as APIError
      toast({
        variant: 'destructive',
        title: ` Помилка ${err.statusCode}`,
        description: err.message,
      })
    }
  }
</script>

<style lang="scss" scoped></style>
