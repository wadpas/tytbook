import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from '../plugins/axios'

export const useAuthStore = defineStore('AuthStore', () => {
	const token = ref('')

	async function registerUser(payload: Object) {
		try {
			const { data } = await axios.post('/auth/register', payload)
			const dataToken = JSON.stringify(data.token)
			token.value = dataToken
			localStorage.setItem('token', dataToken)
		} catch (error) {
			console.log(error)
		}
	}

	async function loginUser(payload: Object) {
		try {
			const { data } = await axios.post('/auth/login', payload)
			const dataToken = JSON.stringify(data.token)
			token.value = dataToken
			localStorage.setItem('token', dataToken)
		} catch (error) {
			console.log(error)
		}
	}

	async function logoutUser() {
		try {
			token.value = ''
			localStorage.removeItem('token')
		} catch (error) {
			console.log(error)
		}
	}

	const isAuth = computed(() => token)

	return {
		token,
		registerUser,
		loginUser,
		logoutUser,
		isAuth,
	}
})
