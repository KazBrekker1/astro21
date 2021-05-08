import { createRouter, createWebHashHistory } from "vue-router"
import Visitors from "../views/Visitors.vue"
import Events from "../views/Events.vue"
import Volunteers from "../views/Volunteers.vue"
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import { auth } from "../../Firebase"

const routes = [
	{
		path: "/login",
		name: "Login",
		alias: "/",
		component: Login,
	},
	{
		path: "/register",
		name: "Register",
		component: Register,
	},
	{
		path: "/visitors",
		name: "Visitors",
		component: Visitors,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: "/events",
		name: "Events",
		component: Events,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: "/volunteers",
		name: "Volunteers",
		component: Volunteers,
		meta: {
			requiresAuth: true,
		},
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router

router.beforeEach((to, from, next) => {
	const requiresAuth = to.matched.some((x) => x.meta.requiresAuth)
	to.name ? NProgress.start() : null
	if (requiresAuth && !auth.currentUser) {
		next("/login")
	} else {
		next()
	}
})

router.afterEach((to, from) => {
	NProgress.done()
})
