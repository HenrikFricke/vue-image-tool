const webpackConfig = require('./build/webpack.test.conf.js');

const ChromiumRevision = require('puppeteer/package.json').puppeteer.chromium_revision;
const Downloader = require('puppeteer/utils/ChromiumDownloader');
const revisionInfo = Downloader.revisionInfo(Downloader.currentPlatform(), ChromiumRevision);

process.env.CHROME_BIN = revisionInfo.executablePath;

// Karma configuration
module.exports = function (config) {
  config.set({
    browsers: ['ChromeHeadless'],

    files: [
      // all files ending in "_test"
      { pattern: 'test/unit/*.spec.js', watched: false },
      { pattern: 'test/unit/**/*.spec.js', watched: false },
    ],

    frameworks: ['jasmine'],

    preprocessors: {
      // add webpack as preprocessor
      'test/unit/*.spec.js': ['webpack'],
      'test/unit/**/*.spec.js': ['webpack'],
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only',
    },
  });
};
