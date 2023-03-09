<template>
	<div>
		<base-dialog
			:show="!!error"
			title="An error occurred!"
			@close="handleError"
		>
			<p>{{ error }}</p>
		</base-dialog>
		<section>
			<base-card>
				<header>
					<h1>Requests received</h1>
				</header>

				<base-spinner v-if="isLoading"></base-spinner>
				<ul v-else-if="hasRequests && !isLoading">
					<request-item
						v-for="request in receivedRequests"
						:key="request.id"
						:email="request.userEmail"
						:message="request.message"
					></request-item>
				</ul>
				<p v-else>You haven't received any requests</p>
			</base-card>
		</section>
	</div>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue'

export default {
	components: { RequestItem },
	data() {
		return {
			error: null,
			isLoading: false,
		}
	},
	computed: {
		receivedRequests() {
			return this.$store.getters.requests
		},
		hasRequests() {
			return this.$store.getters.hasRequests
		},
	},
	methods: {
		async loadRequests() {
			this.isLoading = true
			try {
				await this.$store.dispatch('fetchRequest')
			} catch (err) {
				this.error = err.message || 'Failed to fetch'
			}
			this.isLoading = false
		},
	},
	created() {
		this.loadRequests()
	},
}
</script>

<style scoped>
section {
	margin-top: 2rem;
}
header {
	text-align: center;
	font-weight: bold;
}
p {
	text-align: center;
	padding-top: 1rem;
}
ul {
	list-style: none;
	margin: 1.5rem 0;
}
</style>
