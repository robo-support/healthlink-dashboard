<fhirtree :fhirtreedata="{{ $fhirJSON }}"></fhirtree>

<template>
	<div class="container">

		<h1 v-if="status==='loading'"><app-sync></app-sync> </h1>
		<div class="row justify-content-center ">
			<div class="col-lg-6">
				<div class="card" v-for="(resource, index) in resources" :key="index">
					<div class="card-header">
						<h5>{{resource.body.resourceType}}</h5>
						{{resource.body.name[0].given.toString()+"\t "+resource.body.name[0].family.toString()}}
						<span class="badge badge-secondary pull-right">{{resource.body.gender}}</span>
					</div>
					<div class="card-body">
						<ul class="menu">
							<li class="fhir-item" v-for="(value, key) in resource.body">
								<h5>{{key}}</h5>
									<p>{{value}}</p>
							</li>
							<li> {{resource.attestation}} </li>
						</ul>
						<a href="#" v-on:click="showComponent()" class="btn btn-primary">View more </a>
					</div>
				</div>
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

		</div>

	</div>
</template>
<script>
	import SyncLoader from "./shared/SyncLoader.vue";
	import { mapState } from 'vuex';

	resourceTypeEnum: [{type: String, enum: ['Patient', 'Condition','CapabilityStatement','StructureDefinition','OperationDefinition','CodeSystem','ValueSet','Consent','Practitioner','Person','Group','PractitionerRole','Substance','Device','DeviceMetric','Observation','Procedure','Bundle','DiagonsticReport','AllergyIntolerance','FamilyMemberHistory','OperationOutcome','Encounter','Location','GeneralError']}];


export default { 
	name: 'results',
	computed: mapState(['status', 'resources']),
	components: {
		'app-sync': SyncLoader,
	},
	props: {
	    resourceType: {
	      type: String,
	      validator: value => {
	        if (value in resourceTypeEnum) {
	          return true
	        }
	        return false
	      }
	    },
	    attestation: String,
	    fhirResource: Object,
    },
	data () {
		return {
		};
	},
	watch: {
		status(newValue, oldValue) {
			console.log(`Updating from ${oldValue} to ${newValue}`);

			if (newValue === 'error') {
				console.log("Error during state change..")
			}
		}
	}
};

</script>
<style scoped>
	.container { 
		padding-top: 20vh;
	}
</style>