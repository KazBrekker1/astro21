<template>
	<div class="card bg-primary text-white" style="width: 20rem">
		<div class="card-body">
			<h5 class="card-title">{{ eventInfo["name"] }}</h5>
			<p class="card-text bg-light text-dark rounded-2 shadow-lg p-3">
				{{ eventInfo["description"] }}
			</p>
		</div>
		<ul class="list-group m-2">
			<li class="list-group-item list-group-item-dark">
				{{
					new Date(eventInfo["Time"]).toLocaleString("en-UK", {
						year: "numeric",
						day: "2-digit",
						month: "2-digit",
						hour: "2-digit",
						minute: "2-digit",
						hour12: true,
					})
				}}
			</li>
		</ul>
		<div class="card-footer p-3 shadow-sm">
			<button type="button" class="btn btn-info">View</button>
			<button type="button" class="btn btn-warning">Edit</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "Event",
	props: {
		eventInfo: Object,
	},
}
</script>

<style lang="scss">
.card {
	margin: 2rem;
	button {
		margin: 5px;
	}
}
</style>
