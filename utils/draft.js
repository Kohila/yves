const colors = require('colors')
const axios = require('axios')
const { authenticate } = require('./authenticate')
const { sleep, generateSlug, parsePrecision, getLayout, getStory } = require('./helpers')
const { DCRC_API, DCRC_CDN } = require('../config')
const log = console.log

const createDraftArray = async (story, layoutId, first, last, command, suffix, precision) => {
	
	const draftArray = []
	
	if (last - first) {
		log(`Creating draft pages ${first}-${last} for ${story.title}...`.cyan)
	} else {
		log(`Creating draft page ${first} for ${story.title}...`.cyan)
	}

	for (let i = first; i <= last; i++) {
		const page = {
			pageNumber: parseInt(i),
			command: command,
			nextPageNumber: parseInt(i)+1,
			bodyStd: `[img]${DCRC_CDN}/${story.name == 'vast-error' ? 'vasterror' : story.name}/panels/${parsePrecision(i, precision)}.${suffix}[/img]`,
			story: {
				_id: story.id
			},
			layout: {
				_id: layoutId
			},
			slug: generateSlug(story.name, i),
			published_at: null
		}
		
		draftArray.push(page)
		
		await sleep(50)
		log(`${story.title} page #${i} staged for upload...`.yellow)
	}
	
	return draftArray
}

const uploadDraftArray = async (pages, storyTitle, jwt) => {
	for (page of pages) {
		await axios.post(`${DCRC_API}/pages`, page, jwt)
		await sleep(100)
		log(`${storyTitle} page #${page.pageNumber} has been drafted!`.brightGreen)
	}
}

module.exports = {
	async draft(story = null, first = null, last = null, command = '======>', layout = 'layout-default', suffix = 'gif', precision = 5) {
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
			
			const jwt = await authenticate()
			
			var pages
			
			story = story.toLowerCase()
			const storyData = await getStory(story, jwt)
			if (storyData.length < 1) {
				throw `ERROR: No story found with name ${story}.`
			} else if (storyData.length > 1) {
				let list
				for (story of storyData) {
					list += story.name
				}
				throw `ERROR: More than one story found matching name criteria ${story}. List of stories found: [${list}]`
			}
			
			const layoutData = await getLayout(layout, jwt)
			
			pages = await createDraftArray(storyData, layoutData.id, first, last, command, suffix, precision)
			await uploadDraftArray(pages, storyData.title, jwt)
			
		} catch (e) {
			console.error(e.red)
		}
	}
}

