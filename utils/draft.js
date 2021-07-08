const colors = require('colors')
const axios = require('axios')
const { layouts, stories } = require('../config/defaults')
const { authenticate } = require('./authenticate')
const { sleep, generateSlug, parsePrecision } = require('./helpers')
const { DCRC_API, DCRC_CDN } = require('../config')
const log = console.log

const getLayout = async (layout = 'layout-default', jwt) => {
	const { data } = await axios.get(`${DCRC_API}/layouts?class=${layout}`, jwt)
	return data[0]
}

const getStory = async (story, jwt) => {
	const { data } = await axios.get(`${DCRC_API}/stories?name=${story}`, jwt)
	return data[0]
}

const createDraftArray = async (story, storyId, layoutId, first, last, title) => {
	
	const draftArray = []
	
	log(`Creating draft pages ${first}-${last} for ${story.story}...`.cyan)

	for (let i = parseInt(first); i <= last; i++) {
		const page = {
			pageNumber: i,
			command: title,
			nextPageNumber: i+1,
			bodyStd: `[img]${DCRC_CDN}/${story.imgLoc}/panels/${parsePrecision(i, story.precision)}.${story.suffix}[/img]`,
			story: {
				_id: storyId
			},
			layout: {
				_id: layoutId
			},
			slug: generateSlug(story.storyLoc, i),
			published_at: null
		}
		
		draftArray.push(page)
		
		await sleep(50)
		log(`${story.story} page #${i} staged for upload...`.yellow)
	}
	
	return draftArray
}

const uploadDraftArray = async (pages, story, jwt) => {
	for (let i = 0; i < pages.length; i++) {
		await axios.post(`${DCRC_API}/pages`, pages[i], jwt)
		await sleep(100)
		log(`${story.story} page #${pages[i].pageNumber} has been drafted!`.brightGreen)
	}
}

module.exports = {
	async draft(story = null, first = null, last = null, title = null) {
		try {
			
			// argument validation
			if (story == null)
				throw `ERROR: Story is not specified. Please specify a story with -s or --story.`
			else if (first == null)
				throw `ERROR: First page number is not specified. Please specify a page number with -f or --first.`
			else if (last == null)
				throw `ERROR: Last page number is not specified. Please specify a page number with -l or --last.`
			else if (first > last)
				throw `ERROR: First page number is greater than the last page number.`
			
			(title == null) ? title = `======>` : ''
			
			const jwt = await authenticate()
			
			var pages
			
			switch (story.toLowerCase()) {
				case 'vast-error':
				case 'vasterror':
					const { id:storyId } = await getStory('vast-error', jwt)
					const { id:layoutId } = await getLayout('layout-default', jwt)
					log(storyId)
					log(layoutId)
					pages = await createDraftArray(stories.vasterror, storyId, layoutId, first, last, title)
					await uploadDraftArray(pages, stories.vasterror, jwt)
					break
				case 'thaumatrope':
					throw `ERROR: This story contains multiple substories. Please specify the substory for which you would like to create draft pages.`
					break
				case 'syzygy':
				case 'thaumatrope/syzygy':
					pages = await createDraftArray(stories.syzygy, first, last, title)
					await uploadDraftArray(pages, stories.syzygy, jwt)
					break
					break
				default:
					throw `ERROR: No story found with title ${story}.`
					break
			}
			
		} catch (e) {
			console.error(e.red)
		}
	}
}

