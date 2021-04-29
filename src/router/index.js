import { createRouter, createWebHashHistory } from "vue-router"
import Visitors from "../views/Visitors.vue"
import Events from "../views/Events.vue"
import Volunteers from "../views/Volunteers.vue"

const routes = [
	{
		path: "/",
		name: "Visitors",
		component: Visitors,
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
