<template>

	<div class="container">

		<div class="card" v-for="(resource, index) in resources" :key="index">
			<div>
				<b-card 
				border-variant="success"
        		header-bg-variant="success"
        		header-text-variant="white"
        		header-tag="header"
				footer-tag="footer"
				body-tag="body"
        		:title="resource.body.resourceType"
        		:sub-title="resource.body.id"
        		class="mt-1">

        		<!-- header slot -->
				<h4 slot="header" class="mb-0">
				{{resource.body.name[0].given.toString()+"\t "+resource.body.name[0].family.toString()}}
				<span class="badge badge-secondary pull-right">{{resource.body.gender}}</span>
				</h4>


				<!-- card body -->
				<b-card-body>
					<b-row>
					<b-col cols="8" v-if="'active' in resource.body" >
						Status:
						<span>
							<b-badge v-if="resource.body.active==true" pill variant="success">Active</b-badge>
							<b-badge v-if="resource.body.active==false" pill variant="danger">Inactive</b-badge>
							</span>

					</b-col>
					<b-col v-if="'photo' in resource.body"  >
						<!-- <img v-bind:src="'data:image/jpeg;base64,'+img" /> -->
					<div v-if="links!=undefined" class="clearfix">					  

						<sweetalert-icon v-if="link(resource, links)" class="float-right" icon="success"/>
						<sweetalert-icon v-else-if="link(resource, links)" class="float-right" icon="error"/>
						<sweetalert-icon v-else="link(resource, links)" class="float-right" icon="warning"/>
					</div>

					</b-col>
					</b-row>

					<b-row class="mt-2">
					<b-col>
						<b-button v-b-toggle="'collapse-'+index" variant="primary">View More</b-button>
					</b-col>

					</b-row>

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
      			<em slot="footer">
      			<b-row>
      				<b-col>
					<b-button v-b-toggle="'input-collapse-'+index" variant="warning">Edit</b-button>
					</b-col>
					<b-col>
					<b-button v-b-toggle="'transfer-collapse-'+index" variant="info" class="float-right">Transfer</b-button>
					</b-col>
					</b-row>
					<b-collapse :id="'input-collapse-'+index"
					class="mt-2">
						<b-card>
						  <b-card-body>
						  <p class="card-text">
							<div>

							  </div>   
						  </p>
						  </b-card-body>

						</b-card>
					</b-collapse>
					<b-collapse :id="'transfer-collapse-'+index"
					class="mt-2">
						<b-card>
						  <b-card-body>
						  <p class="card-text">
							<div>

							  </div>   
						  </p>
						  </b-card-body>

						</b-card>
					</b-collapse>

   				

      			</em>


				</b-card>


			</div>



		</div>
			<!-- Dummy loading card -->

			<div class="card" v-if="status==='linking'">
				<div>
					<b-card 
					border-variant="primary"
	        		header-bg-variant="prmary"
	        		header-text-variant="black"
	        		header-tag="header"
					footer-tag="footer"
					body-tag="body"
	        		class="mt-1">

	        		<!-- header slot -->
					<h4 slot="header" class="mb-0">
					Linking additional resources...
					<div class="clearfix">
					  <content>
					  <sweetalert-icon class="float-right" icon="loading"/>
					  </content>
					</div>
					Access Point:
					<span class="badge badge-secondary pull-right">healthlink.network</span>
					</h4>


					<!-- card body -->
					<b-card-body>




					</b-card-body>


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
	import SweetalertIcon from 'vue-sweetalert-icons';
	import Base from "./fhir/Base.vue";


	resourceTypeEnum: [{type: String, enum: ['Patient', 'Condition','CapabilityStatement','StructureDefinition','OperationDefinition','CodeSystem','ValueSet','Consent','Practitioner','Person','Group','PractitionerRole','Substance','Device','DeviceMetric','Observation','Procedure','Bundle','DiagonsticReport','AllergyIntolerance','FamilyMemberHistory','OperationOutcome','Encounter','Location','GeneralError']}];


export default { 
	name: 'results',
	computed: mapState(['status', 'resources', 'links', 'entries']),
    components: { SweetalertIcon, Base },
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
		img: "R0lGODlhEwARAPcAAAAAAAAA/+9aAO+1AP/WAP/eAP/eCP/eEP/eGP/nAP/nCP/nEP/nIf/nKf/nUv/nWv/vAP/vCP/vEP/vGP/vIf/vKf/vMf/vOf/vWv/vY// va//vjP/3c//3lP/3nP//tf//vf//////////////////////////////////////////////////////////////////////////////////////////////// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// /////////////////////////////////////////////////////////yH5BAEAAAEALAAAAAATABEAAAi+AAMIDDCgYMGBCBMSvMCQ4QCFCQcwDBGCA4cLDyE GECDxAoAQHjxwyKhQAMeGIUOSJJjRpIAGDS5wCDly4AALFlYOgHlBwwOSNydM0AmzwYGjBi8IHWoTgQYORg8QIGDAwAKhESI8HIDgwQaRDI1WXXAhK9MBBzZ8/X DxQoUFZC9IiCBh6wEHGz6IbNuwQoSpWxEgyLCXL8O/gAnylNlW6AUEBRIL7Og3KwQIiCXb9HsZQoIEUzUjNEiaNMKAAAA7"
		};
	},
	methods: {
	   	sync: function () {
	   		this.$store.dispatch('query', this.$store.state.token)
	   		.then(() => this.$router.push('/dashboard'))
	   		.catch(err => console.log(err))
	   	},
	   	link: function (resource, metadata) {
	   		console.log(resource.hash)
	   		console.log(JSON.stringify(metadata))
	        if (resource.hash in metadata) {
	        	return true;
	        }
	        else {
	        	return false;
	        }
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
	},
	mounted: {
	}
};

</script>
<style scoped>
	.container { 
		padding-top: 20vh;
	}
</style>