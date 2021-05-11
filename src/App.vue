<template>
	<nav id="nav" class="navbar bg-dark sticky-top p-1 shadow-sm">
		<div v-if="userProfile.name" class="btn btn-outline-primary text-light fw-bold m-1 px-3">
			<span> Arrived: {{ visitors.filter((v) => v.arrived).length }}</span>
		</div>
		<div v-if="userProfile.name" class="m-auto">
			<router-link to="/visitors">Visitors</router-link>
			| <router-link to="/events">Events</router-link> |
			<router-link to="/volunteers">Volunteers</router-link>
		</div>
		<div v-if="!userProfile.name" class="m-auto">
			<router-link to="/login" class="nav-item"> Log-In </router-link> |
			<router-link to="/register" class="nav-item"> Register </router-link>
		</div>
		<button v-else class="btn m-1 px-3 btn-outline-danger" @click="logout">Logout</button>
	</nav>
	<router-view />
</template>

<script>
import { useStore, mapState } from "vuex"
export default {
	setup() {
		const store = useStore()
		const logout = () => {
			store.dispatch("logout")
		}
		return {
			logout,
		}
	},
	computed: {
		...mapState(["userProfile"]),
		...mapState(["visitors"]),
	},
}
</script>

<style lang="scss">
body {
	&::-webkit-scrollbar {
		width: 0;
	}
	background: url("./assets/Stars.jpg") no-repeat center center fixed;
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
