import { defineConfig } from 'cypress'
import { addCucumberPreprocessorPlugin,afterRunHandler } from "@badeball/cypress-cucumber-preprocessor";
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
  e2e: {
    specPattern: "cypress/e2e/features/**/*.feature",
    async setupNodeEvents(on, config) {
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
      on('after:run', async (results) => {
        if (results) {
          await afterRunHandler(config);
          fs.writeFileSync(
            'cypress/reports/results.json',
            JSON.stringify(
              {
                browserName: results.browserName,
                browserVersion: results.browserVersion,
                osName: results.osName,
                osVersion: results.osVersion,
                nodeVersion: results.config.resolvedNodeVersion,
                cypressVersion: results.cypressVersion,
                startedTestsAt: results.startedTestsAt,
                endedTestsAt: results.endedTestsAt,
              },
              null,
              '\t',
            ),
          );
        }
      });
      
      const configfile= config.env.configFile || 'development'
      const env = await getConfigurationByFile(configfile);
      config.env= env.env
      return config;
    }}
})
