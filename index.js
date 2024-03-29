#!/usr/bin/env node
const log = console.log
const { draft } = require('./utils/draft')
const { publish } = require('./utils/publish')
const { renumber } = require('./utils/renumber')

// Init commander
const { Command } = require('commander')
const program = new Command()

program
	.version('1.0.0')
	.description('Utility for drafting or publishing DCRC pages')
program
	.command('draft')
	.option('-s, --story <story>', 'story to modify')
	.option('-f, --first <first>', 'first page of range to create')
	.option('-l, --last <last>', 'last page of range to create')
	.option('-c --command <title>', 'default command for created pages ( fallback as: ======> )')
	.option('-t --layout <layout>', 'default layout for created pages ( fallback as: layout-default )')
	.option('-e --suffix <suffix>', 'default panel image suffix for created pages ( fallback as: gif )')
	.option('-p --precision <precision>', 'default panel image numbering precision for leading zeroes  ( fallback as: 5 )')
	.action((options) => {
		const { story, first, title, layout, suffix, precision } = options
		const last = (typeof options.last == 'undefined') ? first : options.last
		draft(story, first, last, title, layout, suffix, precision)
	})
	
program
	.command('publish')
	.option('-s, --story <story>', 'story to modify')
	.option('-f, --first <first>', 'first page of range to publish')
	.option('-l, --last <last>', 'last page of range to publish')
	.action((options) => {
		const { story, first } = options
		const last = (typeof options.last == 'undefined') ? first : options.last
		publish(story, first, last)
	})
	
program
	.command('renumber')
	.action((options) => {
		renumber()
	})

program.parse(process.argv)