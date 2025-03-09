<template>
  <header class="z-10 shadow-sm">
    <div class="flex items-center justify-between max-w-[1600px] mx-auto p-4">
      <NuxtLink
        to="/"
        class="flex hover:cursor-pointer">
        <NuxtImg
          src="/logo.svg"
          alt="logo"
          class="mr-2 h-9" />
        <h1 class="text-2xl">Тутbook</h1>
      </NuxtLink>
      <nav class="flex items-center space-x-4 lg:space-x-6">
        <template v-if="user">
          <DropdownMenu v-if="user.role === 'admin'">
            <DropdownMenuTrigger as-child>
              <Button class="relative w-6 h-6 rounded-full">
                <Avatar class="bg-white">
                  <Icon
                    name="lucide:cog"
                    class="w-6 h-6 hover:scale-105">
                  </Icon>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              class="w-36"
              align="end">
              <NuxtLink to="/admin/books">
                <DropdownMenuItem>
                  <Icon
                    name="lucide:book-open"
                    class="w-4 h-4">
                  </Icon>
                  Книги
                </DropdownMenuItem>
              </NuxtLink>
              <NuxtLink to="/admin/authors">
                <DropdownMenuItem>
                  <Icon
                    name="lucide:users-round"
                    class="w-4 h-4">
                  </Icon>
                  Автори
                </DropdownMenuItem>
              </NuxtLink>
              <NuxtLink to="/admin/genres">
                <DropdownMenuItem>
                  <Icon
                    name="lucide:drama"
                    class="w-4 h-4">
                  </Icon>
                  Жанри
                </DropdownMenuItem>
              </NuxtLink>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button
                variant="secondary"
                class="relative w-6 h-6 rounded-full">
                <Avatar class="bg-white">
                  <Icon
                    name="lucide:circle-user-round"
                    class="w-6 h-6 hover:scale-105">
                  </Icon>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              class="w-36"
              align="end">
              <DropdownMenuLabel>Вітаємо, {{ user.username }}!</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem @click="logout">
                <Icon
                  name="lucide:log-out"
                  class="w-4 h-4">
                </Icon>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </template>
        <Button class="relative h-8 px-5 py-1 rounded-full">
          <Icon
            name="lucide:shopping-cart"
            class="w-4 h-4">
          </Icon>
          5
        </Button>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
  const { user, clear } = useUserSession()

  const logout = async () => {
    await clear()
    navigateTo('/auth/login')
  }
</script>

<style scoped></style>
