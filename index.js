#!/usr/bin/env node
const log = console.log
const { draft } = require('./utils/draft')
const { publish } = require('./utils/publish')

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
	.option('-c --command <title>', 'default command for created pages')
	.option('-t --theme <layout>', 'default layout for created pages')
	.action((options) => {
		options.title == undefined ? options.title = `======>` : ''
		const { story, first, last, title, layout } = options
		draft(story, first, last, title, layout)
	})
	
program
	.command('publish')
	.option('-s, --story <story>', 'story to modify')
	.option('-f, --first <first>', 'first page of range to publish')
	.option('-l, --last <last>', 'last page of range to publish')
	.action((options) => {
		const { story, first, last } = options
		publish(story, first, last)
	})

program.parse(process.argv)

if (process.argv.length < 3) {
  program.help()
}