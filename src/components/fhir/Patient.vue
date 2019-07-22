<template>
	<div class="card-header">
		{{resourceType}}
	</div>
	<div class="card-body">
		Body
	</div>
</template>

<script>
import Base from './Base.vue';
export default {
  name: 'Patient',
  extends: Base,
  data: {
  	keys: [],
  },
  computed: {
  	fhirResourceKeys: function () {
	    var key;
	    var keys = new Array();
	    var x = 0;
	        
	    for (key in this.fhir-resource)
	    {
	        keys[x] = key;
	        ++ x;
	    }
	    
	    return keys;
  	}
  },
	props: {
	resourceType: {
	  type: String,
	  validator: value => {
	    // only acept if its in the supproted enum
	    if (value in this.resourceTypeEnum) {
	      return 1;
	    }
	    return 0;
	  }
	},
	},
	data () { 
	return { 
	  resourceTypeEnum: [{type: String, enum: ['Patient', 'Condition','CapabilityStatement','StructureDefinition','OperationDefinition','CodeSystem','ValueSet','Consent','Practitioner','Person','Group','PractitionerRole','Substance','Device','DeviceMetric','Observation','Procedure','Bundle','DiagonsticReport','AllergyIntolerance','FamilyMemberHistory','OperationOutcome','Encounter','Location','GeneralError']}],
	}
	},


}
</script>

<style>

</style>
