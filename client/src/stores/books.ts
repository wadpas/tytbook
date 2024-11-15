import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from '../plugins/axios'

export const useBooksStore = defineStore('BooksStore', () => {
	const books = ref([])

	async function getBooks(query: Object) {
		try {
			const { data } = await axios.get('/books', {
				params: query,
			})
			books.value = data.books
			console.log(data)
		} catch (error) {
			throw error
		}
	}

	return {
		getBooks,
		books,
	}
})
