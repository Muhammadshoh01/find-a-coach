<template>
	<div>
		<button v-if="!link" :class="mode">
			<slot></slot>
		</button>
		<router-link v-else :to="to" :class="mode">
			<slot></slot>
		</router-link>
	</div>
</template>

<script>
export default {
	props: {
		link: {
			type: Boolean,
			required: false,
			default: false,
		},
		mode: {
			type: String,
			required: false,
			default: false,
		},
		to: {
			type: String,
			required: false,
			default: '/',
		},
	},
}
</script>

<style scoped>
a {
	text-decoration: none;
}
button,
a {
	padding: 1rem 1.5rem;
	border-radius: 9px;
	cursor: pointer;
	display: inline-block;
	border: 1px solid #3a0061;
	background-color: #3a0061;
	color: white;
}

.flat {
	background-color: #3a0061;
}
.outline {
	color: #3a0061;
	background: transparent;
	border-color: #3a0061;
}

.outline:hover,
.outline:active {
	background-color: #edd2ff;
}
.flat:hover,
.flat:active {
	background-color: #823ab3;
}
</style>
