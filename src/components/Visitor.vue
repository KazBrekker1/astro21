<template>
	<div class="card bg-primary text-white" style="width: 20rem">
		<div class="card-body">
			<h5 class="card-title">{{ visitorInfo["name"] }}</h5>
			<p class="card-text bg-light text-dark rounded-2 shadow-lg p-2">{{ visitorInfo["email"] }}</p>
			<p class="card-text bg-light text-dark rounded-2 shadow-lg p-2">{{ visitorInfo["number"] }}</p>
			<p class="card-text bg-light text-dark rounded-2 shadow-lg p-2">{{ visitorInfo["ticketNumbers"] || 'Null' }}</p>
		</div>
		<ul class="list-group m-2"></ul>
		<div class="card-footer p-2 shadow-sm">
			<button
				type="button"
				class="btn"
				v-bind:class="{ 'btn-warning': !visitorInfo['arrived'], 'btn-success': visitorInfo['arrived'] }"
				@click="toggleStatus"
			>
				<span v-if="visitorInfo['arrived']">Arrived</span>
				<span v-else>Absent</span>
			</button>
			<button type="button" class="btn btn-danger" @click="removeVisitor">Delete</button>
		</div>
	</div>
</template>

<script>
import { useStore } from "vuex"
export default {
	name: "Visitor",
	props: {
		visitorInfo: Object,
	},
	setup(props) {
		const store = useStore()
		const removeVisitor = () => {
			let confirmDeleteCode = prompt(`Enter code to delete ${props.visitorInfo.name}:`, "Code")
			confirmDeleteCode == "GreenHorn"
			confirmDeleteCode ? store.dispatch("removeVisitor", props.visitorInfo.id) : alert("Meh, Don't feel like letting you delete it")
		}
		const toggleStatus = () => {
			store.dispatch("visitorArrived", props.visitorInfo)
		}
		return { removeVisitor, toggleStatus }
	},
}
</script>
