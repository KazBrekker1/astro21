<template>
	<div class="visitors">
		<Visitor v-for="visitor in visitors" :key="visitor['id']" :visitorInfo="visitor" />
		<VisitorForm v-if="state.formVisible" @exitForm="toggleForm" />
		<div v-if="!state.formVisible" class="addNew">
			<button class="btn btn-success p-3" @click="toggleForm">Add</button>
		</div>
	</div>
</template>

<script>
import Visitor from "@/components/Visitor.vue"
import VisitorForm from "@/components/VisitorForm.vue"
import { reactive } from "vue"
import { useStore, mapState } from "vuex"
import { visitorsInfo } from "../assets/mockData/visitors.js"
export default {
	name: "Visitors",
	components: { Visitor, VisitorForm },
	setup() {
		const store = useStore()
		const state = reactive({
			formVisible: false,
		})
		store.dispatch("setVisitors", visitorsInfo)
		const toggleForm = () => {
			state.formVisible = !state.formVisible
		}

		const downloadVisitorsData = () => {
			let csv
			// Loop the array of objects
			for (let row = 0; row < store.state.visitors.length; row++) {
				let keysAmount = Object.keys(store.state.visitors[row]).length
				let keysCounter = 0
				// If this is the first row, generate the headings
				if (row === 0) {
					// Loop each property of the object
					for (let key in store.state.visitors[row]) {
						// This is to not add a comma at the last cell
						// The '\r\n' adds a new line
						csv += key + (keysCounter + 1 < keysAmount ? "," : "\r\n")
						keysCounter++
					}
				} else {
					for (let key in store.state.visitors[row]) {
						csv += store.state.visitors[row][key] + (keysCounter + 1 < keysAmount ? "," : "\r\n")
						keysCounter++
					}
				}

				keysCounter = 0
			}

			// Once we are done looping, download the .csv by creating a link
			let link = document.createElement("a")
			link.id = "download_visitors-csv"
			link.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(csv))
			link.setAttribute("download", "Visitors_Data.csv")
			document.body.appendChild(link)
			document.querySelector("#download_visitors-csv").click()
		}
		return { state, toggleForm }
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
