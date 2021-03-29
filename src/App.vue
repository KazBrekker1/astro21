<template>
	<div id="nav">
		<router-link to="/">Home</router-link> | <router-link to="/events">Events</router-link> |
		<router-link to="/volunteers">Volunteers</router-link>
	</div>
	<router-view />
</template>

<style lang="scss">
body {
	background-image: url("./assets/Stars.jpg");
	background-size: cover;
	margin: 0;
	max-width: 100%;
	overflow-x: hidden;
	position: relative;
	display: block;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}

#nav {
	margin: 1rem;
	padding: 20px;
	border-radius: 15px;
	box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
	background: rgba(180, 180, 180, 0.3);
	filter: blur;

	a {
		font-weight: bold;
		color: #e7c144;
		text-decoration: none;

		&.router-link-exact-active {
			color: #d9f2ff;
		}
	}
}
</style>
