<template>
	<div>
		<ul>
			<li
				v-for="(badge, index) in badges"
				:key="index"
				:class="{
					front: badge === 'frontend',
					back: badge === 'backend',
					career: badge === 'career',
				}"
			>
				{{ badge }}
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	props: ['badges'],
}
</script>

<style scoped>
ul {
	display: flex;
	gap: 1rem;
}
li {
	list-style: none;
	border-radius: 12px;
	padding: 0.5rem 1rem;
	color: white;
	text-transform: uppercase;
	font-size: 1rem;
	margin: 1rem 0;
}
.front {
	background-color: blue;
}
.back {
	background-color: pink;
}

.career {
	background-color: darkmagenta;
}
</style>
