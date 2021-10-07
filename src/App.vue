<template>
	<nav id="nav" class="navbar bg-dark sticky-top p-1 shadow-sm">
		<div
			id="arrived"
			v-if="userProfile.name"
			class="btn btn-outline-warning text-warning fw-bold m-1 px-3"
			style="pointer-events: none"
		>
			<span>Arrived: {{ visitors.filter((v) => v.arrived).length }}</span>
		</div>
		<div id="links" v-if="userProfile.name" class="m-auto">
			<router-link class="mx-2" to="/visitors">Visitors</router-link>
			<router-link class="mx-2" to="/events">Events</router-link>
			<router-link class="mx-2" to="/volunteers">Volunteers</router-link>
		</div>
		<div v-if="!userProfile.name" class="m-auto">
			<router-link to="/login" class="nav-item">Log-In</router-link>
			<router-link v-if="dep" to="/register" class="nav-item">Register</router-link>
		</div>
		<button id="logout" v-else class="btn btn-outline-danger m-1 px-3 fw-bold" @click="logout">Logout</button>
	</nav>
	<router-view />
	<div v-if="error || success" class="fade-in bg-dark m-auto my-3 p-3 rounded-3 shadow-sm" style="width: 20%">
		<span v-if="error" class="text-danger">{{ error }}</span>
		<span v-if="success" class="text-success">{{ success }}</span>
	</div>
</template>

<script>
import { useStore, mapState } from "vuex"
export default {
	setup() {
		const store = useStore()
		const dep = process.env.VUE_APP_DEP == "false"
		const logout = () => {
			store.dispatch("logout")
		}
		return {
			logout,
			dep,
		}
	},
	computed: {
		...mapState(["userProfile"]),
		...mapState(["visitors"]),
		...mapState(["error"]),
		...mapState(["success"]),
	},
}
</script>

<style lang="scss">
body {
	&::-webkit-scrollbar {
		width: 10px;
	}
	&::-webkit-scrollbar-thumb {
		width: 10px;
		background: #302d3c;
	}
	&::-webkit-slider-thumb {
		width: 10px;
	}
	background: url("./assets/Stars.jpg") no-repeat center center fixed;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	height: 100vh;
}

#nav {
	margin: 1rem;
	padding: 20px;
	border-radius: 15px;
	a {
		font-weight: bold;
		color: $secondary;
		text-decoration: none;

		&.router-link-exact-active {
			color: $warning;
		}
	}
	@media screen and (max-width: 667px) {
		display: grid;
		gap: 0.1rem;
		justify-content: space-around;
		grid-template-areas: "links arrived" "links logout";
		#arrived {
			grid-area: arrived;
		}
		#links {
			row-gap: 0.3rem;
			display: flex;
			flex-direction: column;
			grid-area: links;
		}
		#logout {
			grid-area: logout;
		}
	}
}

// #links {
// 	@media screen and (max-width: 667px) {
// 		display: grid;
// 		place-content: center;
// 		// grid-template-columns: 40% 50%;
// 		grid-row: 3 / span 2;
// 	}
// }
</style>
