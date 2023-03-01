import { defineConfig } from 'cypress'
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";

const {Client}= require('pg') ;
const fs = require("fs-extra");
const path = require("path");

async function getConfigurationByFile(file:string) {
  const pathToConfigFile = path.resolve('..', 'pronto-api-tests/cypress/config', `cypress.${file}.json`)

  return fs.readJson(pathToConfigFile)
}

export default defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  "reporterOptions": {
    "reportDir": "cypress/results",
    "overwrite": true,
    "html": true,
    "json": true,
    "embeddedScreenshots": false,
    "charts": true,
    "inline": true,
    "code": true,
    "autoOpen": true,
  } ,
  screenshotsFolder: "cypress/images",
  e2e: {
    specPattern: "cypress/e2e/features/**/*.feature",
    async setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      on("task",{
        async connectDB(arg:{dbconfig: any, query:string}){
          const client= new Client(arg.dbconfig)
          await client.connect()
          const res = await client.query(arg.query)
          await client.end()
          return res.rows;
        }
      });
      addCucumberPreprocessorPlugin(on, config);
      on("file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );
      
      const configfile= config.env.configFile || 'development'
      const env = await getConfigurationByFile(configfile);
      config.env= env.env
      return config;
    }}
})
