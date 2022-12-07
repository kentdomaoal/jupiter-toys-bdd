const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");

// async function setupNodeEvents(on, config) {
//   // This is required for the preprocessor to be able to generate JSON reports after each run
//   await preprocessor.addCucumberPreprocessorPlugin(on, config);
//   on("file:preprocessor",
//     createBundler({
//       plugins: [createEsbuildPlugin.default(config)],
//     })
//   );
//   allureWriter(on, config);
//   return config;
// }

module.exports = defineConfig({
  env: {
    ENV: 'qa',
    allureReuseAfterSpec: true,
  },
  e2e: {
    async setupNodeEvents(on, config) {
      on("file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin.default(config)],
        })
      );
      await preprocessor.addCucumberPreprocessorPlugin(on, config);
      allureWriter(on, config);
    
      return config;
    },
    specPattern: "cypress/e2e/features/*.feature",
    baseUrl: 'http://jupiter.cloud.planittesting.com'
  },
  watchForFileChanges: false,
  video: false,
});
