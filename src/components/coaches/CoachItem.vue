<template>
	<li class="coach">
		<h1>{{ name }}</h1>
		<p>${{ price }}/hour</p>
		<base-badge :badges="badges"></base-badge>
		<div class="btns">
			<base-button :link="true" mode="outline" :to="coachContactLink"
				>Contact</base-button
			>
			<base-button :link="true" mode="flat" :to="coachDetailsLink"
				>View Details</base-button
			>
		</div>
	</li>
</template>

<script>
export default {
	props: ['id', 'name', 'price', 'badges'],
	computed: {
		coachDetailsLink() {
			return this.$route.path + '/' + this.id
		},
		coachContactLink() {
			return this.$route.path + '/' + this.id + '/contact'
		},
	},
}
</script>

<style scoped>
.coach {
	list-style: none;
	border-radius: 10px;
	border: 1px solid black;
	padding: 1.5rem 1rem;
	margin: 1rem 0;
}
.btns {
	display: flex;
	gap: 1.5rem;
	align-items: center;
	justify-content: flex-end;
}
</style>
