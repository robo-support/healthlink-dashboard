import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Auth from '@/services/Auth'
import Fhir from '@/services/Fhir'
import Chain from '@/services/Chain'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
  		status: 'loggedIn',
  		patientId: '',
  		providerId: '',
  		keystoreId: '',
  		keyId: '',
  		token: localStorage.getItem('token') || '',
  		resources : [],
  		links: [],
  		form: {}
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
	    healthlink_request(state){
	  		state.status = 'loading'
	  	},
	  	healthlink_update(state, link) {
	  		state.links.push(link)
	  	},
	  	healthlink_success(state){
	  		state.status = 'success'
	  	},
	  	healthlink_error(state){
	  		state.status = 'error'
	  		state.links = []
	  	},
	  	updateForm(state, form) {
	  		state.form = form
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
	  	login({commit}, userData){
	            commit('auth_request')
	            Auth.login(userData)
	            .then(resp => {
	                const token = resp.data
	                localStorage.setItem('token', token)
	                localStorage.setItem('user', userData)
	                commit('auth_success', token, userData)
	            })
	            .catch(err => {
	            	console.log('Error during login...' + err)
	                commit('auth_error')
	            })
	    },
	  	query({commit}, token){
	            commit('query_request')
	            Fhir.query(token)
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
	  	create({commit}, token, formData){
	            commit('create_request')
	            Fhir.create(token, formData)
	            .then(resp => {
	                console.log(resp.data)
	                console.log(resp.status)
	                commit('create_success')
	            })
	            .catch(err => {
	            	console.log(err)
	                commit('create_error')
	            })
	    },
	  	healthlink({commit}){
	            commit('healthlink_request')
	            // the example chain. TODO: make this progrmmable
	            Chain.chainhead('f0a7447cc7c8ab136c4c253e224377ac108af790d55cd9a9dd372bf2a7a3e737')
	            .then(chain => {
	            	commit('healthlink_loading', chain)
	                console.log('keymr: ' + chain.data.chainhead)
	                const keymr = chain.data.chainhead;
	                while  (keymr != null) {
	                	// Note: let block scope
	                	// retrieve entryblock
	                	Chain.entry_block(keymr)
	                	.then(block => {
	                		console.log('block :' + block)
							block.data.entrylist
							.reverse()
							.forEach( function(entryptr) {
								// over each entryptr in entrylist
								console.log('entryptr :' + entryptr.hash)
								Chain.entry( entryptr.entryhash )
								.then(link =>  {
								commit('healthlink_update', link)
								console.log('link: ' + link)
							    }) //link promise
							    .catch(err => {
						          console.log(err)
						          commit('healthlink_error')
					            }) 
							}) // forEach lambda
	                	}) //block promise 
	                	.catch(err => {
	                		console.log(err)
	                		commit('healthlink_error')
	                	})


	                }
	                commit('healthlink_success')
	            }) //chain promise
	            .catch(err => {
	            	console.log(err)
	                commit('healthlink_error')
	            })
	    },
	 	logout({commit}){
		    return new Promise((resolve, reject) => {
		      	commit('logout')
		      	localStorage.removeItem('token')
		      	localStorage.removeItem('resources')
		      	localStorage.removeItem('links')
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