<template>
	<form class="card bg-primary text-white" @submit.prevent="submitVisitor" style="width: 20rem">
		<div class="card-body">
			<input
				placeholder="Visitor Name"
				v-model="name"
				type="text"
				class="bg-transparent text-center text-white border-0 w-100 h5"
				required
			/>
		</div>
		<ul class="list-group m-2">
			<li class="list-group-item list-group-item-dark p-1 m-1">
				<input
					placeholder="Visitor Email"
					v-model="email"
					type="email"
					class="bg-transparent text-center border-0 w-100 h5"
					required
				/>
			</li>
			<li class="list-group-item list-group-item-dark p-1 m-1">
				<input
					v-model="age"
					type="number"
					min="0"
					max="99"
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
	name: "VisitorForm",
	setup(props, { emit }) {
		const store = useStore()
		const visitorState = reactive({
			name: "",
			email: "",
			age: 0,
			arrived: false,
		})
		const submitVisitor = () => {
			store.dispatch("addVisitor", {
				// id: store.state.visitors.length,
				name: visitorState.name,
				email: visitorState.email,
				age: visitorState.age,
				arrived: visitorState.arrived,
			})
			cancelForm()
		}
		const cancelForm = () => {
			emit("exitForm")
		}
		return { submitVisitor, ...toRefs(visitorState), cancelForm }
	},
}
</script>
