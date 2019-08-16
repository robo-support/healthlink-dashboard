import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Auth from '@/services/Auth'
import Fhir from '@/services/Fhir'
import Chain from '@/services/Chain'
import Link from '@/services/Link'

Vue.use(Vuex)

const NULL_BLOCK = '0000000000000000000000000000000000000000000000000000000000000000'

export default new Vuex.Store({
	state: {
  		status: 'loggedIn',
  		patientId: '',
  		providerId: '',
  		keystoreId: '',
  		keyId: '',
  		chain: '',
  		token: localStorage.getItem('token') || '',
  		resources : [],
  		entries: [],
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
	  		state.status = 'linking'
	  	},
	  	healthlink_update(state, entry) {
	  		state.entries.push(entry)
	  	},
	  	healthlink_success(state){
	  		state.status = 'success'
	  	},
	  	healthlink_error(state){
	  		state.status = 'error'
	  	},
	    unblind_request(state){
	  		state.status = 'unblinding'
	  	},
	  	unblind_update(state, links) {
	  		state.links = links
	  	},
	    unblind_success(state){
	  		state.status = 'success'
	  	},
	  	unblind_error(state){
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
	    	state.entries = []
	    	state.links = []
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
	  	async healthlink({commit, state, dispatch}){
	  		try {
	            commit('healthlink_request')
	            let keymr = await Link.getChain();
	            while (keymr != NULL_BLOCK) {
	            	console.log('keymr: ' + keymr);
	            	let block = await Link.getBlock(keymr); 
	            	let entrylist = block.entrylist.reverse();
	            	console.log('entrylist: ' + JSON.stringify(entrylist));
	            	await Promise.all(entrylist.map( async ( entryptr ) => {
	            		const entry = await Link.getEntry( entryptr.entryhash );
	            		console.log(JSON.stringify(entry))
	            		let content = await Link.decodeContent(entry.content);
	            		let datetime = await Link.decodeContent(entry.extids);
						console.log('content: ' + content);
						console.log('datetime: ' + datetime);
						// push the entry into the list
	            		commit('healthlink_update', content)
	            	}));
	            	// step through hash chain
	            	keymr = block.header.prevkeymr;
	            }
	        }
	        catch (err) {
	        	console.log(err);
	        	commit('healthlink_error');
	        }
	        finally {
	        	commit('healthlink_success');
	        	// store these locally for reuse
	        	localStorage.setItem('entries', state.entries)
	        }
	    },
	  	async unblind({commit, state, dispatch}){
	  		try {
	            commit('unblind_request')
	            await dispatch('healthlink'); // wait for healthlink to sync with chain
	            let metadata = await Link.link(state.token, state.entries);
	            commit('unblind_update', metadata)
	            console.log('metadata: ' + JSON.stringify(state.links))
	        }
	        catch (err) {
	        	console.log(err);
	        	commit('unblind_error');
	        }
	        finally {
	        	commit('unblind_success');
	        	// store these locally for reuse
	        	localStorage.setItem('links', state.links)
	        }
	    },
	 	logout({commit}){
		    return new Promise((resolve, reject) => {
		      	commit('logout')
		      	localStorage.removeItem('token')
		      	localStorage.removeItem('resources')
		      	localStorage.removeItem('links')
		      	localStorage.removeItem('entries')
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