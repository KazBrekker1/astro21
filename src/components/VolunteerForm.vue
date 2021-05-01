<template>
	<form class="card bg-primary text-white" @submit.prevent="submitVolunteer" style="width: 20rem">
		<div class="card-body">
			<input
				placeholder="Volunteer Name"
				v-model="name"
				type="text"
				class="bg-transparent text-center text-white border-0 w-100 h5"
				required
			/>
		</div>
		<ul class="list-group m-2">
			<li class="list-group-item list-group-item-dark p-1 m-1">
				<input
					placeholder="Volunteer Team"
					v-model="team"
					type="text"
					class="bg-transparent text-center border-0 w-100 h5"
					required
				/>
			</li>
			<li class="list-group-item list-group-item-dark p-1 m-1">
				<input
					placeholder="Volunteer Number"
					v-model="number"
					type="text"
					class="bg-transparent text-center border-0 w-100 h5"
					required
				/>
			</li>
			<li class="list-group-item list-group-item-dark p-1 m-1">
				<input
					placeholder="Volunteer Email"
					v-model="email"
					type="text"
					class="bg-transparent text-center border-0 w-100 h5"
					required
				/>
			</li>
		</ul>
		<div class="card-footer p-2 shadow-sm">
			<button type="submit" class="btn btn-success">Submit</button>
			<button type="button" class="btn btn-danger" @click="cancelForm">Cancle</button>
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
				id: store.state.volunteers.length,
				name: volunteerState.name,
				team: volunteerState.team,
				number: volunteerState.number,
				email: volunteerState.email,
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
