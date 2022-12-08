const { defineConfig } = require("cypress");

module.exports = defineConfig({ 
  env: {
    ENV:  'stg'
  },
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: 'http://jupiter.cloud.planittesting.com',
  },
  watchForFileChanges : false,
  screenshotOnRunFailure: true,
  screenshotsFolder: 'cypress/results/assets',
  fixturesFolder: 'cypress/fixtures/stg/',
  video: false,
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: false,
    json: true
  }
});
