import Chain from '@/services/Chain'
import Api from '@/services/Api'

export default {

	async getChain() {
		let chain = await Chain.chainhead('f0a7447cc7c8ab136c4c253e224377ac108af790d55cd9a9dd372bf2a7a3e737');
		return chain.data.result.chainhead;
	},
	async getBlock( keymr ) {
		let block = await Chain.entry_block(keymr);
		return block.data.result;
	},
	async getEntry( entryHash ) {
		let entry =  await Chain.entry( entryHash );
		return entry.data.result;
	},
	async decodeContent(content)
	{
		let hex  = content.toString();
		let str = '';
		for (let n = 0; n < hex.length; n += 2) {
			str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
		}
		return str;
	},
    async link (token, data) {
        console.log('token' + token)
        console.log('metaddata: ' + data)
    	return Api().post('/api/link', data, { headers: { Authorization: `Bearer ${token}` } } )
    }

}