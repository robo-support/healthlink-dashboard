import FactomService from '@/services/FactomService'

export default {

	rpc (method, params) {
	    const data = {
	        jsonrpc: '2.0',
	        id: 1,
	        method: method,
	        params: params
        };
		return FactomService().post('/v2/', method, params)
	},

	chainhead ( chainId ) {
		return this.rpc("chain-head", { chainid: chainId } )
	},

	entry_block ( keymr ) {
		// js object ltierals don't need their keys to be strings as in cPy
		return rpc("entry-block", { keymr: keymr } )
	}, 

	entry ( entryhash ) {
		return rpc("entry", { hash: entryhash } )
	}
	

}


