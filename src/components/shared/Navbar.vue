<template>
	<header>
	<b-navbar toggleable="lg" type="dark" variant="info" class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">

    <b-navbar-brand href="#">HealthLink</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>

        <b-nav-item v-on:click="sync()" class="btn btn-sm btn-outline-success">Sync</b-nav-item>

        <b-nav-item v-on:click="healthlink()" class="mx-1 btn btn-sm btn-outline-warning">Link</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template slot="button-content"><em>HL7</em></template>
          <b-dropdown-item v-on:click="create()">Create</b-dropdown-item>
          <b-dropdown-item v-on:click="transfer()">Transfer</b-dropdown-item>
          <b-dropdown-item v-on:click="healthlink()">Link</b-dropdown-item>
          <b-dropdown-item v-on:click="logout()">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>

    </b-navbar>
    <!--
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
							<span v-on:click="healthlink()" class="btn btn-link">Link</span>
						</a>
					</li>
				</ul>
			</div>
		</nav>
		-->
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
		   	},
		   	link: function () {
		   		console.log('link sucessful...')
		   	},
			healthlink: function () {
			    this.popToast('HealthLink Alert', 'Syncing with HealthLink Servers...')
				this.$store.dispatch('unblind')
				.then(() => {
					this.popToast('HealthLink Alert', 'Link Complete!')
					this.sync()
				})
				.catch(err => console.log(err))
			},
		   	transfer: function () {
		   		this.$router.push('/transfer')
		   	},
		   	create: function () {
		   		this.$router.push('/create')
		   	},
		   	popToast(title, msg) {
		        // Use a shorter name for this.$createElement
		        const h = this.$createElement
		        // Increment the toast count
		        // Create the message
		        const vNodesMsg = h(
		          'p',
		          { class: ['text-center', 'mb-0'] },
		          [
		            h('b-spinner', { props: { type: 'grow', small: true } }),
		            h('strong', {}, msg),
		            h('b-spinner', { props: { type: 'grow', small: true } })
		          ]
		        )
		        // Create the title
		        const vNodesTitle = h(
		          'div',
		          { class: ['d-flex', 'flex-grow-1', 'align-items-baseline', 'mr-2'] },
		          [
		            h('strong', { class: 'mr-2' }, title),
		            h('small', { class: 'ml-auto text-italics' }, 'Just Now!')
		          ]
		        )
		        // Pass the vNodes as an array for message and title
		        this.$bvToast.toast([vNodesMsg], {
		          title: [vNodesTitle],
		          solid: true,
		          variant: 'info'
		        })
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