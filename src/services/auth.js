import axios from 'axios'
import jwt from 'jsonwebtoken'
import fs from 'fs'

export default {
	mockSignatureGeneration (providerId, keystoreId, patientId) {
	  	var priv = fs.readFileSync('./priv.pem')
	  	var payload = {        
	  		"iss": providerId,
	        "iat": _current_timestamp(),
	        "sub": keystoreId,
	        "aud": patientId,
	        "kid": '7e642113-740f-49b7-bc9b-311f70f4ffea',
	    }
		var token = jwt.sign(payload, priv, { algorithm: 'ES256' })
		
		return token

  }, 
}