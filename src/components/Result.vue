<fhirtree :fhirtreedata="{{ $fhirJSON }}"></fhirtree>

<template>

	<div class="container">
		<div class="card" v-for="(resource, index) in resources" :key="index">
			<div>
				<b-card border-variant="success"
        		header-bg-variant="success"
        		header-text-variant="white"
        		header-tag="header"
				footer-tag="footer"
				body-tag="body"
        		:title="resource.body.resourceType"
        		:sub-title="resource.body.id">

        		<!-- header slot -->
				<h4 slot="header" class="mb-0">
				{{resource.body.name[0].given.toString()+"\t "+resource.body.name[0].family.toString()}}
				<span class="badge badge-secondary pull-right">{{resource.body.gender}}</span>
				</h4>


				<!-- card body -->
				<b-card-body>
					
					<img v-if="'photo' in resource.body" v-bind:src="'data:image/jpeg;base64,'+resource.body.photo.data" /> 
					<b-button v-b-toggle="'collapse-'+index" variant="primary">View More</b-button>
					<b-collapse :id="'collapse-'+index"
					class="mt-2">
						<b-card>
						  <b-card-body>
						  <p class="card-text">
								<ul class="menu">
									<li class="fhir-item" v-for="(value, key) in resource.body">
										<h5>{{key}}</h5>
											<p>{{value}}</p>
									</li>
									<li> {{resource.attestation}} </li>
								</ul>
						  </p>
						  </b-card-body>

						</b-card>
					</b-collapse>
				</b-card-body>

				<!-- footer slot -->
      			<em slot="footer">Footer Slot</em>


				</b-card>
			</div>


		</div>
		<content>
				<div class="alert alert-info" role="alert" v-if="resources.length <= 0">
					<h4 class="alert-heading">No Patient Information</h4>
					<p>Please sync with Healthlink</p>
					<hr>
					<p class="mb-0">
					  <b-button v-if="status==='loading'" variant="warning" disabled>
					    <b-spinner small></b-spinner>
					    <span class="sr-only">Loading...</span>
					  </b-button>

					  <b-button variant="warning" v-on:click="sync()">
					    <b-spinner v-if="status==='loading'" small type="grow"></b-spinner>
					    Sync
					  </b-button>
					</p>
				</div>
		</content>
	</div>
</template>
<script>
	import { mapState } from 'vuex';

	resourceTypeEnum: [{type: String, enum: ['Patient', 'Condition','CapabilityStatement','StructureDefinition','OperationDefinition','CodeSystem','ValueSet','Consent','Practitioner','Person','Group','PractitionerRole','Substance','Device','DeviceMetric','Observation','Procedure','Bundle','DiagonsticReport','AllergyIntolerance','FamilyMemberHistory','OperationOutcome','Encounter','Location','GeneralError']}];


export default { 
	name: 'results',
	computed: mapState(['status', 'resources']),
	components: {
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
	methods: {
	   	sync: function () {
	   		this.$store.dispatch('query', this.$store.state.token)
	   		.then(() => this.$router.push('/dashboard'))
	   		.catch(err => console.log(err))
	   	},
	   	decodeImage: function(source) {
	   		var image = new Image();
	   		image.src = source;
	   		return image;
	   	}
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