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

module.exports = {
	sleep,
	generateSlug,
	parsePrecision,
}