const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  env: {
    ENV: 'qa'
  },
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
    baseUrl: 'http://jupiter.cloud.planittesting.com'
  },
  watchForFileChanges: false,
  video: false,
  fixturesFolder: 'cypress/fixtures/qa/'
});
