const ora = require('ora')
const chalk = require('chalk')
const inquirer = require('inquirer')
const log = console.log
const { authenticate, getStories } = require('./helpers')

const draft = async() => {

  const jwt = await authenticate()

  const draftQuestions = {
    type: 'list',
    name: 'story',
    message: 'Which story would you like to edit today?',
    loop: false,
    async choices() {
      const spinner = ora('Fetching list of stories from API . . .').start()
      const stories = await getStories(jwt)
      spinner.stop()
      const choices = stories.reduce((a, story) => {
        return [...a, {
          name: story.title,
          id: story.id
        }]
      }, [])
      return [...choices, new inquirer.Separator(), chalk.italic('None of the Above')]
    },
    validate: (input) => {
      var done = this.async()
      log("Validating...")
      log(input)
      done(null, true)
    }
  }

  const answers = await inquirer.prompt(draftQuestions)

  //log(answers)
}

module.exports = {
  draft
}