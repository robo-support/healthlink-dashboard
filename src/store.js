import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
  		status: 'loggedIn',
  		patientId: '',
  		providerId: '',
  		keystoreId: '',
  		keyId: '',
  		token: localStorage.getItem('token') || '',
  		resources : []
	},
	mutations: {
		auth_request(state){
	    	state.status = 'loading'
	  	},
	  	auth_success(state, token, user){
		    state.status = 'success'
		    state.token = token
		    state.user = user
	  	},
	  	auth_error(state){
	    	state.status = 'error'
	  	},
	  	query_request(state){
	  		state.status = 'loading'
	  	},
	  	query_success(state, resources){
	  		state.status = 'success'
	  		state.resources = resources
	  	},
	  	query_error(state){
	  		state.status = 'error'
	  		state.resources = []
	  	},
	  	create_request(state){
	  		state.status = 'loading'
	  	},
	  	create_success(state){
	  		state.status = 'success'
	  	},
	  	create_error(state){
	  		state.status = 'error'
	  	},
	  	logout(state){
	    	state.status = 'loggedOut'
	    	state.resources = []
	    	state.token = ''
	  	},
	},
	actions: {
	  	login({commit}, user){
	            commit('auth_request')
	            axios({url: 'https://mpi.healthlink.network/api/auth/', 
	            	data: user,
	            	method: 'POST' })
	            .then(resp => {
	                const token = resp.data
	                console.log(user)
	                localStorage.setItem('token', token)
	                localStorage.setItem('user', user)

	                // Add the following line:
	                //axios.defaults.headers.common['Authorization'] = this.$store.state.token
	                commit('auth_success', token, user)
	                Vue.prototype.$http.defaults.headers.common['Authorization'] = token
					Vue.prototype.$http.defaults.headers.common['Access-Control-Allow-Origin'] = 'healthlink.network*'
	            })
	            .catch(err => {
	            	console.log('Error during login...' + err)
	                commit('auth_error')
	            })
	    },
	  	query({commit}, token){
	            commit('query_request')
	            console.log(token)
	            axios({url: 'https://mpi.healthlink.network/api/fhir', 
	            	headers: { Authorization: "Bearer " + token },
	            	method: 'GET' })
	            .then(resp => {
	                const resources = resp.data
	                console.log(resp.data)
	                localStorage.setItem('resources', resources)
	                commit('query_success', resources)
	            })
	            .catch(err => {
	            	console.log('Error during query...'  + err)
	            	console.log(err)
	                commit('auth_error')
	            })
	    },
	  	create({commit}, token){
	            commit('create_request')
	            axios({url: 'https://mpi.healthlink.network/api/fhir', 
	            	   headers: { Authorization: "Bearer " + token },
	            	   method: 'POST',
	            	   data: commit})
	            .then(resp => {
	                console.log(resp.data)
	                console.log(resp.status)
	                commit('create_success', resources)
	            })
	            .catch(err => {
	            	console.log('Error during create...'  + err)
	            	console.log(err)
	                commit('create_error')
	            })
	    },
	 	logout({commit}){
		    return new Promise((resolve, reject) => {
		      	commit('logout')
		      	localStorage.removeItem('token')
		      	localStorage.removeItem('resources')
		      	delete axios.defaults.headers.common['Authorization']
		      	resolve()
		    })
	  	}
	},	
	getters : {
	  isLoggedIn: state => !!state.token,
	  authStatus: state => state.status,
	  getToken: state => state.token,
	  selectedResource(state){
    	console.log('getting selected resource')
    	return state.resources
  	  }
	}
})