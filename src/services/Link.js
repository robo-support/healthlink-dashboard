import Chain from '@/services/Chain'

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
		return await Chain.entry( entryHash );
	},
	// from https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
	async asyncForEach(array, callback) {
		for (let index = 0; index < array.length; index++) {
			await callback(array[index], index, array);
		}
	}
}