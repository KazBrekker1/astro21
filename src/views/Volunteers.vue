<template>
	<div class="volunteers">
		<Volunteer v-for="volunteer in volunteers" :key="volunteer['id']" :volunteerInfo="volunteer" />
		<VolunteerForm v-if="state.formVisible" @exitForm="toggleForm" />
		<div v-if="!state.formVisible" class="addNew">
			<button class="btn btn-success p-3" @click="toggleForm">Add</button>
		</div>
	</div>
</template>

<script>
import Volunteer from "@/components/Volunteer.vue"
import VolunteerForm from "@/components/VolunteerForm.vue"
import { reactive } from "vue"
import { useStore, mapState } from "vuex"
import { volunteersInfo } from "../assets/mockData/volunteers.js"
import * as fb from "../../Firebase"

export default {
	name: "Volunteers",
	components: { Volunteer, VolunteerForm },
	setup() {
		const store = useStore()
		// store.dispatch("setVolunteers", volunteersInfo)
		fb.volunteersCollection
			.where("userId", "==", fb.auth.currentUser.uid)
			// .orderBy("createdOn", "desc")
			.onSnapshot((snapshot) => {
				let volunteersArray = []
				snapshot.forEach((doc) => {
					let volunteer = doc.data()
					volunteer.id = doc.id
					volunteersArray.unshift(volunteer) // Temporary
				})
				store.dispatch("setVolunteers", volunteersArray)
			})
		const state = reactive({
			formVisible: false,
		})
		const toggleForm = () => {
			state.formVisible = !state.formVisible
		}

		const downloadVolunteersData = () => {
			let csv
			// Loop the array of objects
			for (let row = 0; row < store.state.volunteers.length; row++) {
				let keysAmount = Object.keys(store.state.volunteers[row]).length
				let keysCounter = 0
				// If this is the first row, generate the headings
				if (row === 0) {
					// Loop each property of the object
					for (let key in store.state.volunteers[row]) {
						// This is to not add a comma at the last cell
						// The '\r\n' adds a new line
						csv += key + (keysCounter + 1 < keysAmount ? "," : "\r\n")
						keysCounter++
					}
				} else {
					for (let key in store.state.volunteers[row]) {
						csv += store.state.volunteers[row][key] + (keysCounter + 1 < keysAmount ? "," : "\r\n")
						keysCounter++
					}
				}

				keysCounter = 0
			}

			// Once we are done looping, download the .csv by creating a link
			let link = document.createElement("a")
			link.id = "download_volunteers-csv"
			link.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(csv))
			link.setAttribute("download", "Volunteers_Data.csv")
			document.body.appendChild(link)
			document.querySelector("#download_volunteers-csv").click()
		}
		return { state, toggleForm }
	},
	computed: {
		...mapState(["volunteers"]),
	},
}
</script>

<style lang="scss">
.volunteers {
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
