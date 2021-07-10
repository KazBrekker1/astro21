<template>
	<form class="card bg-primary text-white" @submit.prevent="submitVolunteer" style="width: 20rem">
		<div class="card-body">
			<input placeholder="Volunteer Name" v-model="name" type="text" class="bg-transparent text-center text-white border-0 w-100 h5" required />
		</div>
		<ul class="list-group m-2">
			<li class="list-group-item list-group-item-dark p-1 pb-0 m-1">
				<select class="bg-transparent border-0 w-100 h5" v-model="team" required>
					<option value="" disabled>Select Your Team</option>
					<option value="Venue">Venue Team</option>
					<option value="Sponsors">Sponsors Team</option>
					<option value="Workshops">Workshops Team</option>
					<option value="Logistics">Logistics Team</option>
					<option value="Backstage">Backstage Team</option>
					<option value="Technology">Technology Team</option>
					<option value="Registration">Registration Team</option>
					<option value="Human Resources">Human Resources Team</option>
					<option value="Media and Design">Media and Design Team</option>
					<option value="Public Relations">Public Relations Team</option>
				</select>
			</li>
			<li class="list-group-item list-group-item-dark p-1 pb-0 m-1">
				<input placeholder="Volunteer Number" v-model="number" type="number" class="bg-transparent border-0 w-100 h5" />
			</li>
			<li class="list-group-item list-group-item-dark p-1 pb-0 m-1">
				<input placeholder="Volunteer Email" v-model="email" type="email" class="bg-transparent border-0 w-100 h5" />
			</li>
		</ul>
		<div class="card-footer p-2 shadow-sm">
			<button type="submit" class="btn btn-success">Submit</button>
			<button type="button" class="btn btn-danger" @click="cancelForm">Cancel</button>
		</div>
	</form>
</template>

<script>
import { reactive, toRefs } from "vue"
import { useStore } from "vuex"
export default {
	name: "VolunteerForm",
	setup(props, { emit }) {
		const store = useStore()
		const volunteerState = reactive({
			name: "",
			team: "",
			number: "",
			email: "",
		})
		const submitVolunteer = () => {
			store.dispatch("addVolunteer", {
				name: volunteerState.name,
				team: volunteerState.team,
				number: volunteerState.number || "00000000",
				email: volunteerState.email || "private@area51.com",
			})
			emit("exitForm")
		}
		const cancelForm = () => {
			emit("exitForm")
		}
		return { submitVolunteer, ...toRefs(volunteerState), cancelForm }
	},
}
</script>
