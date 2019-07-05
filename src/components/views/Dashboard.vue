<template>
	<div class="d-flex flex-column h-100">
		<Navbar/>
		<Result/>
	</div>
</template>
<script>
	import Navbar from "../shared/Navbar.vue";
	import Result from "../Result.vue";
	export default {
		data () { 
			return { 
			}
		}, 
		components: {
			Navbar, 
			Result
		}, 
		Create: function () {
	   		this.$store.dispatch('query', this.$store.state.token)
	   		.then(() => console.log('syncing...'))
	   		.catch(err => console.log(err))
		},
		methods: {
			query () {
		   		this.$store.dispatch('query')
		   		.then(() => console.log('querying healthlink...'))
		   		.catch(err => console.log(err))
			}
		},
		mounted () { 
			// this.authInit();	
		}
	}
</script>
<style scoped>
	
</style>
