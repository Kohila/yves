const axios = require('axios')
const colors = require('colors')
const fs = require('fs')
const moment = require('moment')
const RSS = require('rss')
const { RSS_DIR, DCRC_API, DCRC_WS } = require('../config')
const log = console.log

const generateRSS = async (story, jwt) => {
	
	const storyRoot = story.split('/', 1)
	
	var { data:storyData } = await axios.get(`${DCRC_API}/stories?name=${storyRoot}`, jwt)
	const { data:pages } = await axios.get(`${DCRC_API}/pages?slug_contains=${story}&_sort=pageNumber:DESC&_limit=50`)
	
	// Edge case handling for Vast Error
	story = (story == 'vast-error') ? 'vasterror' : story
		
	if(!fs.existsSync(RSS_DIR)) {
	  fs.mkdir(RSS_DIR, {recursive: true}, (err) => {if(err) throw err})
	}

	const now = new Date(Date.now())

	var feed = new RSS({
		title: storyData[0].title,
		description: storyData[0].description,
		feed_url: `${DCRC_WS}/${story}/rss`,
		site_url: `${DCRC_WS}/${story}`,
		copyright: `© 2019-${now.getUTCFullYear()} Deconreconstruction LLP`,
		language: 'en-us',
		pubDate: moment(now),
		ttl: '60',
	})
	
	for (let page of pages) {
		feed.item({
			title: page.pageNumber,
			description: page.command,
			url: `${DCRC_WS}/${story}/${page.pageNumber}`,
			guid: page.slug,
			date: moment(page.published_at),
		})
	}
	
	log(feed.xml({ indent: true }))
	
	fs.writeFileSync(`${RSS_DIR}/${storyRoot}.xml`, feed.xml({ indent: true }))
	log(`RSS Feed created on ${moment(now)}`.green)
}
	
module.exports = {
	generateRSS,
}