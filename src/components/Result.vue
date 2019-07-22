<fhirtree :fhirtreedata="{{ $fhirJSON }}"></fhirtree>

<template>
	<div class="container">

		<div class="row justify-content-center ">
			<h1 v-if="status==='loading'"><app-sync></app-sync></h1>
			<div v-else-if="status==='success'">
				<component :is="Base"></component>
			</div>
			<content>
			</content>

		</div>

	</div>
</template>
<script>
	import SyncLoader from "./shared/SyncLoader.vue";
	import Patient from "./fhir/Patient.vue"
	import { mapState } from 'vuex';

export default { 
	name: 'results',
	computed: mapState(['status', 'resources']),
	components: {
		'app-sync': SyncLoader,
		'fhir-base': Base
	},
	data () { 
		return { 
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