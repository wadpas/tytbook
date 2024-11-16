<template>
	<div class="about">
		<h1>This is an books page</h1>
		{{ books }}
	</div>
</template>

<script setup lang="ts">
	import { onMounted } from 'vue'
	import { storeToRefs } from 'pinia'
	import { useBooksStore } from '@/stores/books'

	const booksStore = useBooksStore()
	const { books } = storeToRefs(booksStore)

	onMounted(async () => {
		await booksStore.getBooks({})
	})
</script>
