// see http://vuejs-templates.github.io/webpack for documentation.
var path = require("path");

module.exports = {
  build: {
    env: require("./prod.env"),
    index: path.resolve(__dirname, "../dist/index.html"),
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    productionSourceMap: true,
    BASE_API: require("./prod.env").BASE_API,
    PUBLIC_URL: require("./prod.env").PUBLIC_URL,
    PUSHER_APP_KEY: require('./prod.env').PUSHER_APP_KEY,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require("./dev.env"),
    port: 8090,
    autoOpenBrowser: true,
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    BASE_API: require("./dev.env").BASE_API,
    PUBLIC_URL: require("./dev.env").PUBLIC_URL,
    PUSHER_APP_KEY: require("./dev.env").PUSHER_APP_KEY,
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
};
