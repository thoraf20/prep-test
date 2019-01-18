var merge = require('webpack-merge');
var prodEnv = require('./prod.env');

const BASE_API =  "https://prepcrm.test";
const PUBLIC_URL = "https://public.prepcrm.test";
const PUSHER_APP_KEY = 'cd497c70e86d21a702e5';

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
});

module.exports.BASE_API = `"${BASE_API}"`;
module.exports.PUBLIC_URL = `"${PUBLIC_URL}"`;
module.exports.PUSHER_APP_KEY = `"${PUSHER_APP_KEY}"`;