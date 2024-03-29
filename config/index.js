require('dotenv').config()

const env = process.env.NODE_ENV || 'dev'
const environmentConfig = require(`./${env}`)
  
let globalConfig = {
	ENV: env
}

const config = {...globalConfig, ...environmentConfig}

module.exports = config