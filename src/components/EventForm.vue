<template>
	<form class="card bg-primary text-white" @submit.prevent="submitEvent" style="width: 20rem">
		<div class="card-body">
			<input
				placeholder="Event Name"
				v-model="name"
				type="text"
				class="bg-transparent text-center text-white border-0 w-100 h5"
				required
			/>
			<textarea
				placeholder="Enter Description Here"
				v-model="description"
				rows="2"
				class="bg-light text-black w-100 p-2 border-0"
				required
			></textarea>
		</div>
		<ul class="list-group m-2">
			<li class="list-group-item list-group-item-dark p-0">
				<input
					placeholder="Date"
					v-model="time"
					type="datetime-local"
					class="bg-transparent text-center text-secondary border-0 w-100 p-2"
					required
				/>
			</li>
		</ul>
		<div class="card-footer p-3 shadow-sm">
			<button type="submit" class="btn btn-success">Submit</button>
			<button type="button" class="btn btn-danger">Cancle</button>
		</div>
	</form>
</template>

<script>
import { reactive, toRefs } from "vue"
export default {
	name: "EventForm",
	setup() {
		const state = reactive({
			required: true,
			name: "",
			description: "",
			time: "",
		})
		const submitEvent = () => {
			console.log(`Hello There ${state.time} ${state.name}!`)
		}
		return { submitEvent, ...toRefs(state) }
	},
}
</script>

<style lang="scss">
.card {
	margin: 2rem;
	button {
		margin: 5px;
	}
	::placeholder {
		color: cadetblue;
	}
}
</style>
