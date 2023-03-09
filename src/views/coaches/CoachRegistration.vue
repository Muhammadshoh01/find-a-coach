<template>
	<section>
		<base-card>
			<h1>Register as a coach now!</h1>
			<coach-form @registr-coach="saveData"></coach-form>
		</base-card>
	</section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue'
export default {
	components: { CoachForm },
	methods: {
		saveData(data) {
			console.log(data)
			this.$store.dispatch('addCoach', data)
			// this.$store.commit('userCoach')
		},
	},
}
</script>

<style scoped>
section {
	margin: 2rem 0;
}
</style>
