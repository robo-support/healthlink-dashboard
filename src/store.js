import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
  		status: '',
  		token: localStorage.getItem('token') || '',
  		resources : []
	},
	mutations: {
		auth_request(state){
	    	state.status = 'loading'
	  	},
	  	auth_success(state, token){
		    state.status = 'success'
		    state.token = token
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
	  		state.status = 'success'
	  		state.resources = []
	  	},
	  	logout(state){
	    	state.status = ''
	    	state.token = ''
	  	},
	},
	actions: {
	  	login({commit}, user){
	            commit('auth_request')
	            axios({url: 'http://localhost:9090/api/auth/', 
	            	data: user,
	            	method: 'POST' })
	            .then(resp => {
	                const token = resp.data
	                console.log(resp.data)
	                localStorage.setItem('token', token)
	                // Add the following line:
	                //axios.defaults.headers.common['Authorization'] = this.$store.state.token
	                commit('auth_success', token)
	                console.log('token is now '+ token)
	                resolve(resp)
	            })
	            .catch(err => {
	                commit('auth_error')
	                localStorage.removeItem('token')
	                //reject(err)
	            })
	    },
	  	query({commit}, token){
	            commit('query_request')
	            console.log(token)
	            axios({url: 'http://localhost:9090/api/fhir/Patient/123', 
	            	headers: { Authorization: "Bearer " + token },
	            	method: 'GET' })
	            .then(resp => {
	                const resources = resp.data
	                console.log(resp.data)
	                localStorage.setItem('resources', resources)
	                commit('query_success', resources)
	                resolve(resp)
	            })
	            .catch(err => {
	                commit('auth_error')
	                localStorage.removeItem('token')
	                //reject(err)
	            })
	    },
	 	logout({commit}){
		    return new Promise((resolve, reject) => {
		      	commit('logout')
		      	localStorage.removeItem('token')
		      	delete axios.defaults.headers.common['Authorization']
		      	resolve()
		    })
	  	}
	},	
	getters : {
	  isLoggedIn: state => !!state.token,
	  authStatus: state => state.status,
	  getToken: state => state.token
	}
})