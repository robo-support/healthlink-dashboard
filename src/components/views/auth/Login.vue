<template>
	<div class="text-center">
		<form class="form-signin">
			<h1 class="h3 mb-3 font-weight-normal">
				Please sign in
			</h1>
			<label for="providerId" class="sr-only">
				Provider ID
			</label>
			 <input required v-model="providerId" type="text" class="form-control"  placeholder="Provider Identifier"/>
			<label for="providerId" class="sr-only">
				KeyStore ID
			</label>
			 <input required v-model="keystoreId" type="text" class="form-control"  placeholder="Keystore Identifier"/>
			<label for="providerId" class="sr-only">
				Patient ID
			</label>
			 <input required v-model="patientId" type="text" class="form-control"  placeholder="Patient Identifier"/>
			<label for="KeyId" class="sr-only">
				Key ID
			</label>
			 <input required v-model="keyId" type="text" class="form-control"  placeholder="Key Identifier (for verification of permissions)"/>
		

			<button class="btn btn-lg btn-info btn-block mt-3" type="submit" v-on:click="login()">
				Sign in
			</button>
			<p class="mt-5 mb-3 text-muted text-center">
				&copy; HealthLink 2019
				
				&copy; Consensus Networks 2019
			</p>
		</form>
	</div>
</template>
<script>
	export default {
		data(){
			// this is the 'user' prop
			return {
				providerId : '',
            	keystoreId : '',
            	patientId : '',
            	keyId : ''
            }
		},
		methods: {
		 	login: function () {
		   		let providerId = this.providerId
		   		let keystoreId = this.keystoreId 
		   		let patientId = this.patientId
		   		let keyId = this.keyId
		   		this.$store.dispatch('login', { providerId, keystoreId, patientId, keyId })
		   		.then(() => this.$router.push('/dashboard'))
		   		.catch(err => console.log(err))
		   	}
		}
	}
</script>
<style scoped>
	html, body {
		height: 100%;
	}
	body {
		display: -ms-flexbox;
		display: flex;
		-ms-flex-align: center;
		align-items: center;
		padding-top: 40px;
		padding-bottom: 40px;
		background-color: #f5f5f5;
	}
	.form-signin {
		width: 100%;
		max-width: 330px;
		padding-top: 30vh;
		padding-left: 15px;
		padding-right: 15px;
		padding-bottom: 15px;
		margin: auto;
	}
	.form-signin .checkbox {
		font-weight: 400;
	}
	.form-signin .form-control {
		position: relative;
		box-sizing: border-box;
		height: auto;
		padding: 10px;
		font-size: 16px;
	}
	.form-signin .form-control:focus {
		z-index: 2;
	}
</style>
