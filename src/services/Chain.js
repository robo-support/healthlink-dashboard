import FactomService from '@/services/FactomService'

export default {

	rpc (method, params) {
	    let data = {
	        jsonrpc: '2.0',
	        id: 0,
	        method: method,
	        params: params
        };
		return FactomService().post('/v2', data)
	},

	chainhead ( chainId ) {
		return this.rpc("chain-head", { chainid: chainId } )
	},

	entry_block ( keymr ) {
		// js object ltierals don't need their keys to be strings as in cPy
		return this.rpc("entry-block", { keymr: keymr } )
	}, 

	entry ( entryhash ) {
		return this.rpc("entry", { hash: entryhash } )
	}
	

}


