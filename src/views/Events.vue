<template>
	<div class="events">
		<Event v-for="event in events" :key="event['id']" :eventInfo="event" />
		<EventForm v-if="state.formVisible" @exitForm="toggleForm" />
		<EventsCalendar v-if="state.calendarVisible" @exitCalendar="toggleCalendar" />
		<div v-if="!state.formVisible && !state.calendarVisible" class="addNew">
			<button class="btn btn-success p-3" @click="toggleForm">Add</button>
			<button class="btn btn-primary p-3" @click="downloadEventsData">Download</button>
			<button class="btn btn-warning p-3" @click="toggleCalendar">Show Events</button>
		</div>
	</div>
</template>

<script>
import Event from "@/components/Event.vue"
import EventForm from "@/components/EventForm.vue"
import EventsCalendar from "@/components/EventsCalendar.vue"
import { reactive } from "vue"
import { useStore, mapState } from "vuex"
import { eventsInfo } from "../assets/mockData/events.js"
export default {
	name: "Events",
	components: { Event, EventForm, EventsCalendar },
	setup() {
		const store = useStore()
		store.dispatch("setEvents", eventsInfo)
		const state = reactive({
			formVisible: false,
			calendarVisible: false,
		})
		const toggleForm = () => {
			state.formVisible = !state.formVisible
		}
		const toggleCalendar = () => {
			state.calendarVisible = !state.calendarVisible
		}

		const downloadEventsData = () => {
			let csv

			// Loop the array of objects
			for (let row = 0; row < store.state.events.length; row++) {
				let keysAmount = Object.keys(store.state.events[row]).length
				let keysCounter = 0

				// If this is the first row, generate the headings
				if (row === 0) {
					// Loop each property of the object
					for (let key in store.state.events[row]) {
						// This is to not add a comma at the last cell
						// The '\r\n' adds a new line
						csv += key + (keysCounter + 1 < keysAmount ? "," : "\r\n")
						keysCounter++
					}
				} else {
					for (let key in store.state.events[row]) {
						csv += store.state.events[row][key] + (keysCounter + 1 < keysAmount ? "," : "\r\n")
						keysCounter++
					}
				}

				keysCounter = 0
			}

			// Once we are done looping, download the .csv by creating a link
			let link = document.createElement("a")
			link.id = "download_events-csv"
			link.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(csv))
			link.setAttribute("download", "Events_Data.csv")
			document.body.appendChild(link)
			document.querySelector("#download_events-csv").click()
		}

		return { state, toggleForm, toggleCalendar, downloadEventsData }
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
