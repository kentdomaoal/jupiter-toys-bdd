const { defineConfig } = require("cypress");

module.exports = defineConfig({ 
  env: {
    ENV:  'qa'
  },
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: 'http://jupiter.cloud.planittesting.com',
  },
  watchForFileChanges : false,
  fixturesFolder: 'cypress/fixtures/qa/',
  screenshotOnRunFailure: true,
  screenshotsFolder: 'cypress/results/assets',
  video: false,
  fixturesFolder: 'cypress/fixtures/qa/',
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: false,
    json: true
  }
});
