import Api from '@/services/Api'

export default {
	query (token) {
		console.log('token' + token)
        return Api().get('/api/fhir', { headers: { Authorization: `Bearer ${token}` } } )
    },
    create (token, data) {
        console.log('token' + token)
        console.log('formData: ' + data)

    	return Api().post('/api/fhir', data, { headers: { Authorization: `Bearer ${token}` } } )
    }
}