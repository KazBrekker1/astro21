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
import * as fb from "../../Firebase"

export default {
	name: "Events",
	components: { Event, EventForm, EventsCalendar },
	setup() {
		const store = useStore()
		let eventsArray
		fb.eventsCollection
			.where("userId", "==", fb.auth.currentUser.uid)
			.orderBy("createdOn", "desc")
			.onSnapshot((snapshot) => {
				eventsArray = []
				snapshot.forEach((doc) => {
					let event = doc.data()
					event.id = doc.id
					eventsArray.unshift(event) // Temporary
				})
				store.dispatch("setEvents", eventsArray)
			})
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
			let keys = Object.keys(store.state.events[0])
			keys = keys.filter((k) => k != "createdOn" && k != "id" && k != "userId")
			// Build header
			let csv = keys.join(",") + "\n"

			// Add the rows
			store.state.events.forEach((obj) => {
				csv += keys.map((k) => obj[k]).join(",") + "\n"
			})
			// console.log(csv)
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
