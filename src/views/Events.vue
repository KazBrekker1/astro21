<template>
	<div class="events">
		<Event v-for="event in events" :key="event['id']" :eventInfo="event" />
		<EventForm v-if="state.formVisible" @exitForm="toggleForm" />
		<div v-if="!state.formVisible" class="addNew">
			<button class="btn btn-success p-3" @click="toggleForm">Add</button>
		</div>
	</div>
</template>

<script>
import Event from "@/components/Event.vue"
import EventForm from "@/components/EventForm.vue"
import { ref, reactive } from "vue"
import { useStore, mapState } from "vuex"
import { eventsInfo } from "../assets/mockData/events.js"
export default {
	name: "Events",
	components: { Event, EventForm },
	setup() {
		const store = useStore()
		store.dispatch("setEvents", eventsInfo)
		const state = reactive({
			formVisible: false,
		})
		const toggleForm = () => {
			state.formVisible = !state.formVisible
		}
		return { state, toggleForm }
	},
	computed: {
		...mapState(["events"]),
	},
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
