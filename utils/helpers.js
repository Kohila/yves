const colors = require('colors')
const axios = require('axios')
const { DCRC_API } = require('../config')
const log = console.log

function sleep(ms) {
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
	const { data } = await axios.get(`${DCRC_API}/stories?name=${story}`, jwt)
	return data[0]
}

module.exports = {
	sleep,
	generateSlug,
	parsePrecision,
	getLayout,
	getStory,
}