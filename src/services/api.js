import axios from 'axios'

export default {

  mockSignatureGeneration (providerId, keyId, patientId) {
    return axios({
		method: 'post',
		url: '/api/auth/',
		params: {
			providerId: providerId,
			keyId: keyId,
			patientId: patientId
		},
		headers: {'Content-Type': 'application/json'}
	})
	.then(response => {
		return response.data
	})
  },

}
