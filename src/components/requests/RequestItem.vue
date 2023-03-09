<template>
	<li>
		<div>
			<a :href="emailLink">{{ email }}</a>
		</div>
		<p>{{ message }}</p>
	</li>
</template>

<script>
export default {
	props: ['email', 'message'],
	computed: {
		emailLink() {
			return 'mailto:' + this.email
		},
	},
}
</script>

<style scoped>
li {
	border: 1px solid #333;
	padding: 1rem;
}
a {
	color: #b320d8;
	text-decoration: none;
	margin-bottom: 1rem;
}
</style>
