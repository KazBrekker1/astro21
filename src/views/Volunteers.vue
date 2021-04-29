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
export default {
	name: "Volunteers",
	components: { Volunteer, VolunteerForm },
	setup() {
		const store = useStore()
		store.dispatch("setVolunteers", volunteersInfo)
		const state = reactive({
			formVisible: false,
		})
		const toggleForm = () => {
			state.formVisible = !state.formVisible
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
