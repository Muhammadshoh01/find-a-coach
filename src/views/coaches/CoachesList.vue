<template>
	<div>
		<base-dialog :show="!!error" title="An error occured" @close="handleError">
			<p>{{ error }}</p>
		</base-dialog>
		<section class="filter">
			<coach-filter @change-filter="setFilter"></coach-filter>
		</section>
		<section>
			<base-card>
				<div class="btns">
					<base-button mode="outline" :link="true" to="/" @click="setCoach"
						>Refresh</base-button
					>
					<base-button
						mode="flat"
						to="/registr"
						:link="true"
						v-if="!userIsCoach && !isLoading"
						>Register as a coach</base-button
					>
				</div>

				<div class="coaches">
					<div class="roll" v-if="isLoading">
						<base-spinner></base-spinner>
					</div>
					<ul v-else-if="hasCoaches">
						<coach-item
							v-for="coach in filteredCoaches"
							:key="coach.id"
							:id="coach.id"
							:name="coach.name"
							:price="coach.price"
							:badges="coach.badges"
						></coach-item>
					</ul>
					<h3 v-else>No coaches found</h3>
				</div>
			</base-card>
		</section>
	</div>
</template>

<script>
import CoachFilter from '../../components/coaches/CoachFilter.vue'
// import CoachForm from '../../components/coaches/CoachForm.vue'
import CoachItem from '../../components/coaches/CoachItem.vue'

export default {
	components: { CoachFilter, CoachItem },
	data() {
		return {
			activeFilters: {
				frontend: true,
				backend: true,
				career: true,
			},
			isLoading: false,
			error: null,
		}
	},
	computed: {
		filteredCoaches() {
			const coaches = this.$store.getters.coaches
			return coaches.filter((coach) => {
				if (this.activeFilters.frontend && coach.badges.includes('frontend')) {
					return true
				}
				if (this.activeFilters.backend && coach.badges.includes('backend')) {
					return true
				}
				if (this.activeFilters.career && coach.badges.includes('career')) {
					return true
				}
				return false
			})
		},
		coaches() {
			return this.$store.getters.coaches
		},
		hasCoaches() {
			return !this.isLoading && this.$store.getters.hasCoaches
		},
		userIsCoach() {
			return this.$store.getters.userIsCoach
		},
	},
	methods: {
		handleError() {
			this.error = null
		},
		userIsCoach() {
			this.$store.commit('userCoach')
		},
		setFilter(filter) {
			this.activeFilters = filter
		},
		// registrCoach(newCoach) {
		// 	this.$store.dispatch('addCoach', newCoach)
		// },
		async setCoach() {
			this.isLoading = true
			try {
				await this.$store.dispatch('setCoach')
			} catch (err) {
				this.error = err
			}
			this.isLoading = false
		},
	},
	created() {
		this.setCoach()
	},
}
</script>

<style scoped>
.filter {
	margin: 2rem 0;
}
.btns {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.roll {
	text-align: center;
}
</style>
