<template>
	<div class="card bg-primary text-white" style="width: 20rem">
		<div class="card-body">
			<h5 class="card-title">Card title</h5>
			<p class="card-text bg-light text-dark rounded-2 shadow-lg p-3">
				Some quick example text to build on the card title and make up the bulk of the card's content.
			</p>
		</div>
		<ul class="list-group m-2">
			<li class="list-group-item list-group-item-dark">An item</li>
			<li class="list-group-item list-group-item-dark">A second item</li>
			<li class="list-group-item list-group-item-dark">A third item</li>
		</ul>
		<div class="card-footer p-3 shadow-sm">
			<button type="button" class="btn btn-info">View</button>
			<button type="button" class="btn btn-warning">Edit</button>
		</div>
	</div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.card {
	margin: 2rem;
	button {
		margin: 5px;
	}
}
</style>
