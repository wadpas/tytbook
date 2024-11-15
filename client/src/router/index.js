import { createRouter, createWebHistory } from 'vue-router'
import Books from '../views/Books.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: Books,
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'not-found',
			component: NotFound,
		},
	],
})

export default router
