#!/usr/bin/env node
/* eslint-disable no-console */

const yargs = require('yargs');

// project specific configuration
const config = require('./lib/configuration.js');

// the elasticsearch client
const client = require('./client.js')(config.client);

// the command runner
const steker = require('./lib/steker.js')(client);

const { validFilepath, validJSON } = require('./utils/validation.js');

const argv = yargs
      .command('$0', 'Refer to elasticsearch documentation to check which methods you can use')
      .option('edit', {
          alias: 'e',
          describe: 'Edit requisition before sending it to Elasticsearch client',
          type: 'boolean'
      })
      .option('file', {
          alias: 'f',
          describe: 'JS/JSON file to be sent as parameters',
          type: 'string',
          coerce: validFilepath
      })
      .option('body', {
          alias: 'b',
          describe: 'JS/JSON file or a valid JSON serializable string',
          type: 'string',
          coerce: validJSON
      })
      .option('watch', {
          alias: 'w',
          describe: 'Watch file for changes and redo commmand',
          type: 'boolean'
      })
      .argv;

const [
    commands,
    params,
    programOptions
] = require('./lib/distillator.js')(argv);

if (programOptions.watch && (programOptions.file ||  programOptions.isBodyFile)) {
    const fileToWatch = (() => {
        if (programOptions.file) {
            return programOptions.file;
        } else if (programOptions.isBodyFile) {
            return programOptions.body;
        }
    })();

    setTimeout(() => {
        require('fs').watchFile(fileToWatch, () => {
            trigger();
        });
    }, 0);
} else if (programOptions.watch) {
    console.log('The `watch` option needs to be sent along `file` or `body`');
}

// the starter function
const trigger = () => {
    steker(commands, params, programOptions)
        .then((res) => {
            if (res instanceof Object) {
                console.log(JSON.stringify(res, null, config.printWidth));
            } else {
                console.log(res);
            }
        })
        .catch((e) => {
            // In case error comes from an elasticsearch operation
            if (typeof e.toJSON === 'function') {
                console.error(e.toJSON());
            } else {
                console.error(e);
            }

            // exit program
            process.exit(1);
        });
};

// execute program
trigger();
