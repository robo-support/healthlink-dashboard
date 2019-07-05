<template>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-lg-6" v-if="payload.length <= 0">
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
		<div class="row justify-content-center " v-if="payload.length > 0">
			<div class="col-lg-6">
				<h3>Patient Information</h3>
				<div class="card" v-if="payload.length > 0" v-for="patient in payload">
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
						<a href="#" class="btn btn-primary">View more</a>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>
<script>
	export default { 
		data () { 
			return { 
				payload: this.$store.state.resources
			}
		},
		Create: function () {
				console.log('using token... ' + this.$store.state.token)
		   		this.$store.dispatch('query')
		   		.then(() => this.payload=this.$store.state.records)
		   		.catch(err => console.log(err))
		},
		methods: {
		}
	}
</script>
<style scoped>
	.container { 
		padding-top: 20vh;
	}
</style>