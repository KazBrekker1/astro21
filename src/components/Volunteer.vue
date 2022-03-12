<template>
	<div class="card bg-primary text-white" style="width: 20rem">
		<div class="card-body">
			<h5 class="card-title">{{ volunteerInfo["name"] }}</h5>
			<p class="card-text bg-light text-dark rounded-2 shadow-lg p-2">{{ volunteerInfo["team"] }}</p>
			<p class="card-text bg-light text-dark rounded-2 shadow-lg p-2">{{ volunteerInfo["email"] }}</p>
			<p class="card-text bg-light text-dark rounded-2 shadow-lg p-2">{{ volunteerInfo["number"] }}</p>
		</div>
		<ul class="list-group m-2"></ul>
		<div class="card-footer p-2 shadow-sm">
			<button
				type="button"
				class="btn"
				v-bind:class="{ 'btn-warning': !volunteerInfo['arrived'], 'btn-success': volunteerInfo['arrived'] }"
				@click="toggleCheckin"
			>
				<span v-if="volunteerInfo['arrived']">Arrived</span>
				<span v-else>Not Here</span>
			</button>
			<button type="button" class="btn btn-danger" @click="removeVolunteer">Delete</button>
		</div>
	</div>
</template>

<script>
import { useStore } from "vuex"
export default {
	name: "Volunteer",
	props: {
		volunteerInfo: Object,
	},
	setup(props) {
		const store = useStore()
		const removeVolunteer = () => {
			let confirmDeleteCode = prompt(`Enter code to delete ${props.volunteerInfo.name}:`, "Code")
			confirmDeleteCode == "GreenHorn"
				? store.dispatch("removeVolunteer", props.volunteerInfo.id)
				: alert("Meh, Don't feel like letting you delete it")
		}
		const toggleCheckin = () => {
			store.dispatch("volunteerArrived", props.volunteerInfo)
		}
		return { removeVolunteer, toggleCheckin }
	},
}
</script>
