<script>
import TheHeader from './components/layout/TheHeader.vue'
export default {
	components: { TheHeader },
}
</script>

<template>
	<div>
		<the-header></the-header>
		<router-view v-slot="slotProps">
			<transition name="route" mode="out-in">
				<component :is="slotProps.Component"></component>
			</transition>
		</router-view>
	</div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');
* {
	padding: 0;
	margin: 0;
	box-sizing: border-box;
}
html {
	font-family: 'Roboto', sans-serif;
}

.route-enter-from {
	opacity: 0;
	transform: translateY(-30px);
}
.route-leave-to {
	opacity: 0;
	transform: translateY(30px);
}
.route-enter-active {
	transition: 0.3s all ease-out;
}
.route-leave-active {
	transition: 0.3s all ease-in;
}
.route-enter-to,
.route-leave-from {
	opacity: 1;
	transform: translateY(0);
}
</style>
