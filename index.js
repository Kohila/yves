#!/usr/bin/env node
const log = console.log
const { draft } = require('./utils2/draft')
//const { publish } = require('./utils/publish')
//const { renumber } = require('./utils/renumber')

const chalk = require('chalk')
const yves = chalk.bold.hex('#953520')

const inquirer = require('inquirer')

const init = async () => {
	log(yves(`Good evening, Secily.\n`))

	const initQuestions = [
		{
			type: 'list',
			name: 'commands',
			message: 'What would you like to do today?',
			choices: [
				'Draft — Create a collection of drafted boilerplate comic pages.',
				'Publish — Publish a collection of existing draft comic pages and re-render the corresponing RSS Feed.',
				'Nothing — Do nothing.']
		}
	]

	const answers = await inquirer.prompt(initQuestions)

	const command = answers.commands.split(" ",1)[0]

	switch(command) {
		case 'Draft':
			draft()
			break
		case 'Publish':
			break
		default:
			log(yves(`\nGoodbye.`))
			break
	}
}

init()


// Init commander
/*const { Command } = require('commander')
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

program.parse(process.argv)*/