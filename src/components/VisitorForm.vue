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
				/>
			</li>
			<li class="list-group-item list-group-item-dark p-1 m-1">
				<input v-model="number" placeholder="Visitor Phone" type="tel" class="bg-transparent text-center border-0 w-100 h5" />
			</li>
			<li class="list-group-item list-group-item-dark p-1 pb-0 m-1">
				<select class="bg-transparent border-0 w-100 h5" v-model="visitorType">
					<option value disabled>Select Visitor Type</option>
					<option value="Lecturer">Lecturer</option>
					<option value="Student">Student</option>
					<option value="Visitor">Visitor</option>
				</select>
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
	name: "VisitorForm",
	setup(props, { emit }) {
		const store = useStore()
		const visitorState = reactive({
			name: "",
			email: "",
			number: "",
			visitorType: "",
			arrived: true,
			w1: false,
			w2: false,
			w3: false,
			w4: false,
		})
		const submitVisitor = () => {
			store.dispatch("addVisitor", {
				name: visitorState.name,
				arrived: visitorState.arrived,
				number: visitorState.number || "00000000",
				email: visitorState.email || "private@area51.com",
				visitorType: visitorState.visitorType,
				w1: false,
				w2: false,
				w3: false,
				w4: false,
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
