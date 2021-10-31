const colors = require('colors')
const axios = require('axios')
const { authenticate } = require('./authenticate')
const { sleep, generateSlug, parsePrecision, getLayout, getStory } = require('./helpers')
const { DCRC_API, DCRC_CDN } = require('../config')
const log = console.log

/*const createDraftArray = async (story, layoutId, first, last, command, suffix, precision) => {
	
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
}*/

module.exports = {
	async renumber() {
		try {
		
			const jwt = await authenticate()
			
			for(let i = 1860; i < 1890; i++) {
				let newNumber = i - 4
				const { data:page } = await axios.get(`${DCRC_API}/pages/all?pageNumber=${i}`, jwt)
				log(`Reordering page #${i} to be page #${newNumber}...`.yellow)
				const newData = {
					pageNumber: newNumber,
					nextPageNumber: newNumber+1,
					slug: generateSlug(page[0].story.name, newNumber)
				}
				log(newData)
				await axios.put(`${DCRC_API}/page/all/${page[0].id}`, newData, {jwt})
				log(`...done!`.brightGreen)
				i = 1889
			}
			
			/*const pages = await createDraftArray(storyData[0], layoutData.id, first, last, command, suffix, precision)
			await uploadDraftArray(pages, storyData[0].title, jwt)*/
	
		} catch (e) {
			console.error(e.red)
		}
	}
}

