
<template>
  <component :is="resourceType" :resourceType="resourceType" 
  :attestation="attestation"
  :fhirResource="fhirResource"></component>
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
    resourceType: String,
    attestation: String,
    fhirResource: Object,
  },
  data () { 
    return { 
    }
  },


}
</script>

<style>

</style>