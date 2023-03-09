<template>
	<div>
		<section>
			<base-card class="card">
				<h1>{{ coachName }}</h1>
				<p class="price">${{ coachPrice }}/hour</p>
			</base-card>
		</section>
		<section>
			<base-card class="card">
				<p class="interest">Interested? Reach out now!</p>
				<base-button link mode="flat" :to="coachContactLink"
					>Contact</base-button
				>
				<router-view></router-view>
			</base-card>
		</section>
		<section>
			<base-card class="card">
				<base-badge :badges="coachBadges"></base-badge>
				<p>{{ coachDescription }}</p>
			</base-card>
		</section>
	</div>
</template>

<script>
export default {
	data() {
		return {
			selectedCoach: null,
		}
	},
	props: ['id'],
	computed: {
		coaches() {
			return this.$store.getters.coaches
		},
		coachContactLink() {
			return this.$route.path + this.id + '/contact'
		},
		coachName() {
			console.log(this.selectedCoach.name)
			return this.selectedCoach[0].name
		},
		coachPrice() {
			return this.selectedCoach[0].price
		},
		coachBadges() {
			return this.selectedCoach[0].badges
		},
		coachDescription() {
			return this.selectedCoach[0].description
		},
	},
	created() {
		this.selectedCoach = this.$store.getters.coaches.filter(
			(coach) => coach.id == this.id
		)
	},
}
</script>

<style scoped>
section {
	margin: 2rem 0;
}
.price {
	font-weight: bold;
	font-size: 1.2rem;
	margin-top: 1rem;
}
.interest {
	font-size: 1.5rem;
	margin-bottom: 1rem;
}
</style>
