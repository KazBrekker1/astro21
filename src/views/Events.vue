<template>
	<div class="events">
		<Event v-for="event in eventsInfo" :key="event['id']" :eventInfo="event" />
		<div class="addNew">
			<button class="btn btn-success p-3">Add</button>
		</div>
	</div>
</template>

<script>
import Event from "@/components/Event.vue"
import { ref } from "vue"
import { eventInfo } from "../assets/mockData/events.js"
export default {
	name: "Events",
	setup() {
		const eventsInfo = ref(eventInfo)
		return { eventsInfo }
	},
	components: { Event },
}
</script>

<style lang="scss">
.events {
	overflow: hidden;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
	.addNew {
		min-height: 20rem;
		display: grid;
		place-items: center;
	}
}
</style>
