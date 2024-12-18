import { defineConfig } from "cypress";
import webpackPreprocessor from "@cypress/webpack-preprocessor";
import webpackConfig from "./webpack.config.cjs";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
      webpackConfig,
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      // Dynamically import cypress-xpath within the setupNodeEvents
      import('cypress-xpath').then(xpath => {
        xpath.default(on, config);  // Assuming 'xpath' is the default export
      }).catch(e => console.error('Failed to load cypress-xpath', e));

      // Return the updated config object if you modify it
      return config;
    },
  },
});
