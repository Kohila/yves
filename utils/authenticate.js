const axios = require('axios')

const { DCRC_LOGIN, DCRC_PWD, DCRC_API } = require('../config')

module.exports = {
	async authenticate() {
		const params = new URLSearchParams()
		params.append('identifier', DCRC_LOGIN)
		params.append('password', DCRC_PWD)
		const config = {
			headers: {
				'content-type': 'application/x-www-form-urlencoded'
			}
		}
		const { data } = await axios.post(`${DCRC_API}/auth/local`, params, config)
		return {
			headers: {
				Authorization: `Bearer ${data.jwt}`
			}
		}
	}
}