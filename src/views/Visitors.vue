<template>
	<div class="visitors">
		<Visitor v-for="visitor in visitors" :key="visitor['id']" :visitorInfo="visitor" />
		<VisitorForm v-if="state.formVisible" @exitForm="toggleForm" />
		<div v-if="!state.formVisible" class="addNew">
			<button class="btn btn-success p-3" @click="toggleForm">Add</button>
			<button class="btn btn-primary p-3" @click="downloadVisitorsData">Download</button>
		</div>
	</div>
</template>

<script>
import Visitor from "@/components/Visitor.vue"
import VisitorForm from "@/components/VisitorForm.vue"
import { reactive } from "vue"
import { useStore, mapState } from "vuex"
import * as fb from "../../Firebase"

export default {
	name: "Visitors",
	components: { Visitor, VisitorForm },
	setup() {
		const store = useStore()
		const state = reactive({
			formVisible: false,
		})
		let visitorsArray
		fb.visitorsCollection.where("userId", "==", fb.auth.currentUser.uid).onSnapshot((snapshot) => {
			visitorsArray = []
			snapshot.forEach((doc) => {
				let visitor = doc.data()
				visitor.id = doc.id
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
		return { state, toggleForm, downloadVisitorsData }
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
