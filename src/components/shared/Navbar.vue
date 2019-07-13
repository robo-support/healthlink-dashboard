<template>
	<header>
		<nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
			<a class="navbar-brand" href="#">HealthLink</a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarCollapse">
				<ul class="navbar-nav mr-auto">
					<li class="nav-item">
						<a class="nav-link" href="#">
							<span v-on:click="sync()" class="btn btn-sm btn-outline-warning">
								Sync
							</span>
						</a>
					</li>
				</ul>
				<form class="form-inline mt-2 mt-md-0">
					<input 
						class="form-control mr-sm-2" 
						type="text" 
						placeholder="Search by Resource Type" 
						aria-label="Search"
					>
					<button 
						class="btn btn-outline-info my-2 my-sm-0"
						type="submit"
					>
						Search
					</button>
				</form>
				<ul class="navbar-nav">
					<li class="nav-item">
						<a class="nav-link" href="#">
							<span v-on:click="logout()" class="btn btn-link">Logout</span>
						</a>
					</li>
				</ul>
			</div>
		</nav>
	</header>
</template>
<script>
	export default { 
		data () { 
			return { 

			}
		},
		methods: {
		 	logout: function () {
		   		this.$store.dispatch('logout')
		   		.then(() => this.$router.push('/'))
		   		.catch(err => console.log(err))
		   	},
		   	sync: function () {
		   		this.$store.dispatch('query', this.$store.state.token)
		   		.then(() => this.$router.push('/dashboard'))
		   		.catch(err => console.log(err))
		   	}
		}
	}
</script>
<style scoped>
	.nav-link > .btn-link {
		color: #fff;
		text-decoration: none !important;
	}
</style>