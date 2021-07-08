const colors = require('colors')
const { layouts, stories } = require('../config/defaults')
const { authenticate } = require('./authenticate')
const { sleep, generateSlug } = require('./helpers')
const log = console.log

module.exports = {
	async publish(story = null, first = null, last = null) {
		try {
			// argument validation
			if (story == null)
				throw 'ERROR: Story is not specified. Please specify a story with -s or --story.'
			else if (first == null)
				throw 'ERROR: First page number is not specified. Please specify a page number with -f or --first.'
			else if (last == null)
				throw 'ERROR: Last page number is not specified. Please specify a page number with -l or --last.'
			else if (first > last)
				throw 'ERROR: First page number is greater than the last page number.'
			
			const { jwt } = await authenticate()
			
			
			
		} catch (e) {
			console.error(e.red)
		}
	}
}