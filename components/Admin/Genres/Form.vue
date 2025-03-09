<template>
  <div>
    <div class="flex items-center justify-between">
      <Heading
        title="Жанр"
        description="Введіть інформацію для створення/редагування жанру">
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
          name="name">
          <FormItem>
            <FormLabel>Назва</FormLabel>
            <FormControl>
              <Input
                placeholder="Детектив"
                v-bind="componentField" />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <Button
        class="ml-auto"
        type="submit">
        Зберегти
      </Button>
      <Button
        class="ml-4"
        type="button"
        @click="$router.back()">
        Скасувати
      </Button>
    </form>
  </div>
  <AlertModal
    :isModalVisible="isModalVisible"
    @on-close="isModalVisible = false"
    @on-confirm="deleteGenre">
  </AlertModal>
</template>

<script setup lang="ts">
  import type { APIError, Genre, RouteParams } from '~/types'
  import { toTypedSchema } from '@vee-validate/zod'
  import { useForm } from 'vee-validate'
  import { genreSchema } from '~/server/utils/validations'
  import { toast } from '~/components/ui/toast'

  const isEditing = ref(true)
  const isModalVisible = ref(false)
  const router = useRouter()
  const route = useRoute()

  const { data: currentGenre } = await useFetch<Genre>(`/api/genres/${route.params.slug}`)

  watchEffect(() => {
    if (route.params.slug === 'new') {
      isEditing.value = false
    } else if (!currentGenre.value) {
      navigateTo('/admin/genres')
    }
  })

  const formSchema = toTypedSchema(genreSchema)
  const form = useForm({
    validationSchema: formSchema,
    initialValues: currentGenre.value || {},
  })

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      if (isEditing.value) {
        await $fetch(`/api/genres/${route.params.slug}`, {
          method: 'PATCH',
          body: values,
        })
      } else {
        await $fetch('/api/genres', {
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

  const deleteGenre = async () => {
    try {
      await $fetch(`/api/genres/${route.params.slug}`, {
        method: 'DELETE',
      })
      navigateTo('/admin/genres')
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
