<template>
	<div class="card bg-primary text-white" style="width: 20rem">
		<div class="card-body">
			<h5 class="card-title">{{ volunteerInfo["name"] }}</h5>
			<p class="card-text bg-light text-dark rounded-2 shadow-lg p-2">
				{{ volunteerInfo["team"] }}
			</p>
			<p class="card-text bg-light text-dark rounded-2 shadow-lg p-2">
				{{ volunteerInfo["email"] }}
			</p>
			<p class="card-text bg-light text-dark rounded-2 shadow-lg p-2">
				{{ volunteerInfo["number"] }}
			</p>
		</div>
		<ul class="list-group m-2"></ul>
		<div class="card-footer p-2 shadow-sm">
			<button type="button" class="btn btn-warning">Edit</button>
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
			let conf = confirm(`Delete ${props.volunteerInfo.name}`)
			conf ? store.dispatch("removeVolunteer", props.volunteerInfo.id) : null
		}
		return { removeVolunteer }
	},
}
</script>
