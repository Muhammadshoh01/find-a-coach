<template>
	<base-card>
		<h1>Find your coach</h1>
		<div class="form">
			<div class="form-control">
				<input type="checkbox" id="frontend" checked @change="setFilter" />
				<label for="front">Frontend</label>
			</div>
			<div class="form-control">
				<input type="checkbox" id="backend" checked @change="setFilter" />
				<label for="back">Backend</label>
			</div>
			<div class="form-control">
				<input type="checkbox" id="career" checked @change="setFilter" />
				<label for="career">Career</label>
			</div>
		</div>
	</base-card>
</template>

<script>
export default {
	emits: ['change-filter'],
	data() {
		return {
			filters: {
				frontend: true,
				backend: true,
				career: true,
			},
		}
	},
	methods: {
		setFilter(event) {
			const inputId = event.target.id
			const inputIsChecked = event.target.checked

			const updatedFilter = { ...this.filters, [inputId]: inputIsChecked }
			this.filters = updatedFilter
			this.$emit('change-filter', updatedFilter)
		},
	},
}
</script>

<style scoped>
h1 {
	font-size: 1.6rem;
	font-weight: 700;
}
.form {
	display: flex;
	gap: 0.5rem;
	margin-top: 1rem;
}
.form-control {
	display: flex;
	gap: 0.3rem;
}
</style>
