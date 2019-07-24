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
			Result,
		}, 
		props: {
		},
		Create: function () {
		},
		methods: {
		},
		mounted () { 
			// this.authInit();	
		}
	}
</script>
