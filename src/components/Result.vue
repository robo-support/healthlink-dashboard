<template>
	<div class="container">

		<div class="row justify-content-center">
			<h1 v-if="status === 'success'">Success {{ complex.deep }}</h1>
			<h1 v-else-if="status === 'error'">Error</h1>
			<h1 v-else>Loading</h1>
			<div class="col-lg-6" v-if="resources.length <= 0">
				<div class="alert alert-info" role="alert">
					<h4 class="alert-heading">No Patient Information</h4>
					<p>Please sync with Healthlink</p>
					<hr>
					<p class="mb-0">
						<span class="btn btn-sm btn-warning">
							Sync
						</span>
					</p>
				</div>
			</div>
		</div>
		<div class="row justify-content-center " v-if="resources.length > 0">
			<div class="col-lg-6">
				<h3>Patient Information</h3>
				<div class="card" v-if="resources.length > 0" v-for="(patient, index) in resources" :key="index">
					<div class="card-header">

						{{patient.body.name[0].given.toString()+"\t "+patient.body.name[0].family.toString()}}
						<span class="badge badge-secondary pull-right">{{patient.body.gender}}</span>
					</div>
					<div class="card-body">
						<h6>Organization</h6>
						<p class="card-text">
							Walt Disney Corporation
						</p>
						<h6>Managing Organzation</h6>
						<p class="card-text">
							ACME Healthcare, Inc
						</p>
						<a href="#" v-on:click="showComponent()" class="btn btn-primary">View more </a>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>
<script>
	import { mapState } from 'vuex';

export default { 
	name: 'results',
	data() {
		return {
			complex: 'null',
		};
	},
	computed: mapState(['status', 'resources']),
	watch: {
		status(newValue, oldValue) {
			console.log(`Updating from ${oldValue} to ${newValue}`);

			if (newValue === 'error') {
				deep: 'something went very wrong'
			};
		}
	}
};

</script>
<style scoped>
	.container { 
		padding-top: 20vh;
	}
</style>