import { createRouter, createWebHashHistory } from "vue-router"
import Home from "../views/Home.vue"
import Events from "../views/Events.vue"
import Volunteers from "../views/Volunteers.vue"

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/events",
		name: "Events",
		component: Events,
	},
	{
		path: "/volunteers",
		name: "Volunteers",
		component: Volunteers,
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

export default router
