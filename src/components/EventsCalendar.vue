<template>
	<div>
		<!-- Modal -->
		<div
			class="modal fade"
			id="eventsModal"
			data-bs-backdrop="static"
			data-bs-keyboard="false"
			tabindex="1"
			aria-labelledby="eventsModalLabel"
			aria-hidden="true"
		>
			<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
				<div class="modal-content bg-dark">
					<div class="modal-header bg-warning text-dark">
						<h5 class="modal-title fs-4" id="eventsModalLabel">Events</h5>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
							@click="cancelCalendar"
						></button>
					</div>
					<div class="modal-body">
						<ol class="list-group p-3">
							<li
								v-for="event in [...events].sort((a, b) => {
									return new Date(b.time) - new Date(a.time)
								})"
								:key="event['id']"
								class="list-group-item list-group-item-dark d-flex justify-content-between align-items-start m-3 p-3 fs-5"
							>
								<div class="m-auto d-flex">
									<div class="fw-bold">{{ event["name"] }}</div>
									: {{ event["description"] }}
								</div>
								<span class="badge bg-primary rounded-pill p-3 fs-5">{{
									new Date(event["time"]).toLocaleString("en-AU", {
										year: "numeric",
										day: "2-digit",
										month: "2-digit",
										hour: "2-digit",
										minute: "2-digit",
										hour12: true,
									})
								}}</span>
							</li>
						</ol>
						<button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="cancelCalendar">Close</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex"
import { Modal } from "bootstrap"
export default {
	name: "EventsCalendar",
	setup(props, { emit }) {
		const cancelCalendar = () => {
			emit("exitCalendar")
		}
		return { cancelCalendar }
	},
	mounted() {
		let myModal = new Modal(document.getElementById("eventsModal"), {
			backdrop: false,
			keyboard: false,
		})
		myModal.show()
	},
	computed: {
		...mapState(["events"]),
	},
}
</script>
