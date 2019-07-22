
<template>        

  <div class="col-lg-6">
    <div class="card" v-for="(resource, index) in resources" :key="index">
      <component :is="resource.body.resourceType" :resourceType="resource.body.resourceType"></component>
      
    </div>
  </div>      
</template>

<script>
import Patient from "./Patient.vue";
 

//Use watch for computing the 'freshness' https://vuejs.org/v2/guide/computed.html

export default {
  name: 'Base',
  components: {
    'Patient': Patient
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