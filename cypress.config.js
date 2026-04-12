const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://demoqa.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 15000,
    requestTimeout: 20000,
    pageLoadTimeout: 60000,
    retries: {
      runMode: 0,
      openMode: 0
    },
    video: false,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // Aquí se pueden registrar plugins adicionales
    },
  },
});
