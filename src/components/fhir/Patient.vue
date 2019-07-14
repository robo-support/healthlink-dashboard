<fhirtree :fhirtreedata="{{ $fhirJSON }}"></fhirtree>

<template>
	<div class="card-header">

		{{fhir-resource.name[0].given.toString()+"\t "+fhir-resource.name[0].family.toString()}}
		<span class="badge badge-secondary pull-right">{{fhir-resource.gender}}</span>
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
		<ul class="menu">
			<li class="fhir-item" v-for="(key, value) in fhir-resource">
				@{{key}}
					<fhirtree :fhirtreedata="value"></fhirtree>
			</li>
		</ul>
		<a href="#" v-on:click="showComponent()" class="btn btn-primary">View more </a>
	</div>
</template>

<script>

export default {
  name: 'Patient',
  data: {
  	keys: [],
  },
  props: {
  	resourceType: String,
  	attestation: String,
  	fhirResource: Object
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
  }


}
</script>

<style>

</style>
