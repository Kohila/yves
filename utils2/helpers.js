//const colors = require('colors')
const axios = require('axios')
const log = console.log
const { DCRC_API, DCRC_LOGIN, DCRC_PWD } =require('../config')

const authenticate = async () => {
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

const getStories = async (auth) => {
	const { data } = await axios.get(`${DCRC_API}/stories`, auth)

	return data
}

/*function sleep(ms) {
  return new Promise((resolve) => {
	setTimeout(resolve, ms)
  })
}

function generateSlug(s, n) {
	var slug
	if (n > 9999) {
		slug = `${s}-${n}`
	} else if(n > 999) {
		slug = `${s}-0${n}`
	} else if(n > 99) {
		slug = `${s}-00${n}`
	} else if(n > 9) {
		slug = `${s}-000${n}`
	} else {
		slug = `${s}-0000${n}`
	}
	
	return slug
}

function parsePrecision(num, prec) {
	
	num = num.toString()

	while (num.length < prec) {
		num = '0' + num
	}
	
	return num
}

async function getLayout(layout = 'layout-default', jwt) {
	let { data } = await axios.get(`${DCRC_API}/layouts?class=${layout}`, jwt)
	
	if (data.length <= 0) {
		log(`WARNING: No layout found with class name ${layout}. Fallback to layout-default.`.yellow)
		data = (await axios.get(`${DCRC_API}/layouts?class=layout-default`, jwt)).data
	}
	
	return data[0]
}



async function getStory(story, jwt) {
	const { data } = await axios.get(`${DCRC_API}/stories?name_contains=${story}`, jwt)
	if (data.length > 0) {
		return data
	} else {
		return null
	}
}*/

module.exports = {
  authenticate,
	getStories
}