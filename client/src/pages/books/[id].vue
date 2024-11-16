<template>
	<div>Books</div>
	<div>{{ id }}</div>
</template>

<script setup lang="ts">
	import { useRoute } from 'vue-router'

	const route = useRoute()

	let id = ''
	if ('id' in route.params) id = route.params.id
</script>
