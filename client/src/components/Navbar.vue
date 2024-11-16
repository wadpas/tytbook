<template>
	<nav class="shadow-sm">
		<div class="flex flex-wrap items-center justify-between p-4 mx-auto max-w-screen-2xl">
			<a
				href="https://flowbite.com/"
				class="flex items-center space-x-3 rtl:space-x-reverse">
				<img
					src="../../tytbook.svg"
					class="h-8"
					alt="Flowbite Logo" />
				<span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ТутBook</span>
			</a>
			<button
				data-collapse-toggle="navbar-default"
				type="button"
				class="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
				aria-controls="navbar-default"
				aria-expanded="false">
				<span class="sr-only">Open main menu</span>
				<svg
					class="w-5 h-5"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 17 14">
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M1 1h15M1 7h15M1 13h15" />
				</svg>
			</button>
			<div
				class="hidden w-full md:block md:w-auto"
				id="navbar-default">
				<ul
					class="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg md:p-0 bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
					<li>
						<router-link
							:to="{ name: '/' }"
							class="block px-3 py-2 md:p-0"
							activeClass="block px-3 py-2 text-white bg-orange-500 rounded md:bg-transparent md:text-orange-600 md:p-0 dark:text-white md:dark:text-orange-600"
							aria-current="page">
							Home
						</router-link>
					</li>
					<li>
						<router-link
							:to="{ name: '/books/' }"
							class="block px-3 py-2 md:p-0"
							activeClass="block px-3 py-2 text-white bg-orange-500 rounded md:bg-transparent md:text-orange-600 md:p-0 dark:text-white md:dark:text-orange-600"
							aria-current="page">
							Books
						</router-link>
					</li>
					<li>
						<router-link
							:to="{ name: '/about' }"
							class="block px-3 py-2 md:p-0"
							activeClass="block px-3 py-2 text-white bg-orange-500 rounded md:bg-transparent md:text-orange-600 md:p-0 dark:text-white md:dark:text-orange-600"
							aria-current="page">
							About
						</router-link>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<script setup lang="ts"></script>
