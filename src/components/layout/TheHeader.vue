<template>
	<header>
		<nav>
			<div class="logo">
				<h1><router-link to="/">Find a Coach</router-link></h1>
			</div>
			<div>
				<ul class="navigation">
					<li><router-link to="/coaches">All Coaches</router-link></li>
					<li><router-link to="/requests">Requests</router-link></li>
				</ul>
			</div>
		</nav>
	</header>
</template>

<script>
export default {}
</script>

<style scoped>
header {
	background-color: #3d008d;
	width: 100%;
	height: 5rem;
	display: flex;
	justify-content: center;
	align-items: center;
}
header nav {
	width: 90%;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.logo h1 a {
	color: white;
	font-size: 25px;
	text-decoration: none;
}
.navigation {
	display: flex;
	gap: 2.5rem;
	list-style: none;
}
.navigation li a {
	color: #f391e3;
	text-decoration: none;
	padding: 1rem;
	transition: 0.1s ease;
	border: 1px solid transparent;
}

.navigation li a:hover,
.navigation li a:active,
.navigation li a.router-link-active {
	border: 1px solid #f391e3;
}
</style>
