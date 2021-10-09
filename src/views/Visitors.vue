<template>
	<div class="container mx-auto">
		<div class="row height w-80 m-auto">
			<div class="search gap-3">
				<input type="text" class="form-control" placeholder="Name" v-model="searchName" />
				<input type="text" class="form-control" placeholder="Number" v-model="searchNumber" />
				<input type="text" class="form-control" placeholder="Email" v-model="searchEmail" />
				<input type="text" class="form-control" placeholder="Ticket Number" v-model="searchTicket" />
			</div>
		</div>
	</div>
	<div class="visitors">
		<div v-if="!state.formVisible" class="addNew">
			<button class="btn btn-success p-3" @click="toggleForm">Add</button>
			<button class="btn btn-primary p-3" @click="downloadVisitorsData">Download</button>
		</div>
		<div
			v-for="visitor in [...visitors].filter(
				(vis) =>
					vis.name.toLowerCase().includes(searchName.toLowerCase()) &&
					vis.ticketNumbers?.toLowerCase().includes(searchTicket.toLowerCase()) &&
					vis.number.includes(searchNumber) &&
					vis.email.toLowerCase().includes(searchEmail.toLowerCase())
			)"
			:key="visitor['id']"
		>
			<Visitor :visitorInfo="visitor" />
			<VisitorWorkshops :visitorInfo="visitor" />
		</div>
		<VisitorForm v-if="state.formVisible" @exitForm="toggleForm" />
	</div>
</template>

<script>
import Visitor from "@/components/Visitor.vue"
import VisitorForm from "@/components/VisitorForm.vue"
import VisitorWorkshops from "@/components/VisitorWorkshops.vue"
import { reactive, toRefs } from "vue"
import { useStore, mapState } from "vuex"
import * as fb from "../../Firebase"

export default {
	name: "Visitors",
	components: { Visitor, VisitorForm, VisitorWorkshops },
	setup() {
		const store = useStore()
		const state = reactive({
			formVisible: false,
		})
		const searcherState = reactive({
			searchName: "",
			searchNumber: "",
			searchEmail: "",
			searchTicket: "",
		})
		let visitorsArray
		fb.visitorsCollection
			.where("userId", "==", fb.auth.currentUser.uid)
			.onSnapshot((snapshot) => {
				visitorsArray = []
				snapshot.forEach((doc) => {
					let visitor = doc.data()
					visitor.id = doc.id
					visitor.number = `${visitor.number}`
					visitorsArray.unshift(visitor) // Temporary
				})
				store.dispatch("setVisitors", visitorsArray)
			})
		const toggleForm = () => {
			state.formVisible = !state.formVisible
		}

		const downloadVisitorsData = () => {
			let keys = Object.keys(store.state.visitors[0])
			keys = keys.filter((k) => k != "createdOn" && k != "id" && k != "userId")
			// Build header
			let csv = keys.join(",") + "\n"

			// Add the rows
			store.state.visitors.forEach((obj) => {
				csv += keys.map((k) => obj[k]).join(",") + "\n"
			})

			// Once we are done looping, download the .csv by creating a link
			let link = document.createElement("a")
			link.id = "download_visitors-csv"
			link.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(csv))
			link.setAttribute("download", "Visitors_Data.csv")
			document.body.appendChild(link)
			document.querySelector("#download_visitors-csv").click()
		}
		return { state, toggleForm, downloadVisitorsData, ...toRefs(searcherState) }
	},
	computed: {
		...mapState(["visitors"]),
	},
}
</script>

<style lang="scss">
.visitors {
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
