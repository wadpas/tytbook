<template>
	<div class="flex flex-col h-screen">
		<Navbar />
		<div class="container m-2 mx-auto mb-auto">
			<slot></slot>
		</div>
		<Footer />
	</div>
</template>

<script setup>
	import Navbar from '@/components/Navbar.vue'
	import Footer from '@/components/Footer.vue'
</script>
