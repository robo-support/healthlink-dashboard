import axios from 'axios'

export default() => {

    return axios.create({
        baseURL: process.env.VUE_APP_ROOT_API,
        withCredentials: false,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
}


// import axios from 'axios'

// const API_URL = 'https://mpi.healthlink.network/';
// export class APIService{

//   axios.defaults.headers.post['Content-Type'] = 'application/json';

//   constructor(){

//   }

//   getFhirResources(token) {
//     const url = `${API_URL}/api/fhir`;
//     return axios.get(url, { Authentication: 'Bearer' + token})
//     .then(response => response.data);
//   }

//   postFhirResource(token, data) {
//     const url = `${API_URL}/api/fhir`;
//     return axios.post(url, data, { Authentication: 'Bearer' + token})
//   }


// }


// export default {



//   mockSignatureGeneration (providerId, keyId, patientId, keystoreId) {
//     return axios({
// 		method: 'post',
// 		url: '/api/auth/',
// 		params: {
// 			providerId: providerId,
// 			keyId: keyId,
// 			patientId: patientId,
//       keystoreId: keystoreId
// 		},
// 		headers: {'Content-Type': 'application/json'}
// 	})
// 	.then(response => {
// 		return response.data
// 	})
//   }

// ,}
