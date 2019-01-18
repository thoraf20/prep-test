var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

const BASE_API =  "http://your-api-url"

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
})

module.exports.BASE_API = `"${BASE_API}"`