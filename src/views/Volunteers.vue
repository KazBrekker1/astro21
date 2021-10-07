<template>
	<div class="container mx-auto">
		<div class="row height w-80 m-auto">
			<div class="search gap-3">
				<input type="text" class="form-control" placeholder="Name" v-model="searchName" />
				<input type="text" class="form-control" placeholder="Team" v-model="searchTeam" />
			</div>
		</div>
	</div>
	<div class="volunteers">
		<Volunteer
			class="mx-auto"
			v-for="volunteer in [...volunteers].filter(
				(vol) =>
					vol.name.toLowerCase().includes(searchName.toLowerCase()) &&
					vol.team.toLowerCase().includes(searchTeam.toLowerCase())
			)"
			:key="volunteer['id']"
			:volunteerInfo="volunteer"
		/>
		<VolunteerForm v-if="state.formVisible" @exitForm="toggleForm" />
		<div v-if="!state.formVisible" class="addNew">
			<button class="btn btn-success p-3" @click="toggleForm">Add</button>
			<button class="btn btn-primary p-3" @click="downloadVolunteersData">Download</button>
		</div>
	</div>
</template>

<script>
import Volunteer from "@/components/Volunteer.vue"
import VolunteerForm from "@/components/VolunteerForm.vue"
import { reactive, toRefs } from "vue"
import { useStore, mapState } from "vuex"
import * as fb from "../../Firebase"

export default {
	name: "Volunteers",
	components: { Volunteer, VolunteerForm },
	setup() {
		const store = useStore()
		const state = reactive({
			formVisible: false,
		})
		const searcherState = reactive({
			searchName: "",
			searchTeam: "",
		})
		let volunteersArray
		fb.volunteersCollection
			.where("userId", "==", fb.auth.currentUser.uid)
			.onSnapshot((snapshot) => {
				volunteersArray = []
				snapshot.forEach((doc) => {
					let volunteer = doc.data()
					volunteer.id = doc.id
					volunteersArray.unshift(volunteer) // Temporary
				})
				store.dispatch("setVolunteers", volunteersArray)
			})

		const toggleForm = () => {
			state.formVisible = !state.formVisible
		}

		const downloadVolunteersData = () => {
			let keys = Object.keys(store.state.volunteers[0])
			keys = keys.filter((k) => k != "createdOn" && k != "id" && k != "userId")
			// Build header
			let csv = keys.join(",") + "\n"

			// Add the rows
			store.state.volunteers.forEach((obj) => {
				csv += keys.map((k) => obj[k]).join(",") + "\n"
			})

			// Once we are done looping, download the .csv by creating a link
			let link = document.createElement("a")
			link.id = "download_volunteers-csv"
			link.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(csv))
			link.setAttribute("download", "Volunteers_Data.csv")
			document.body.appendChild(link)
			document.querySelector("#download_volunteers-csv").click()
		}

		return { state, toggleForm, downloadVolunteersData, ...toRefs(searcherState) }
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
