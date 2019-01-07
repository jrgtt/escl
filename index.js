#!/usr/bin/env node

const yargs = require('yargs');

// project specific configuration
const config = require('./lib/configuration.js');

// the elasticsearch client
const client = require('./client.js')(config.client);

// the command runner
const steker = require('./lib/steker.js')(client);

const { validFilepath, validJSON } = require('./utils/validation.js');
const { logSuccess, logError } = require('./lib/logger.js');

const argv = yargs
      .command('$0', 'A command line tool to run elasticsearch-js methods')
      .version('0.1.0')
      .help('H')
      .option('edit', {
          alias: 'e',
          describe: 'Edit command parameters before executing',
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

try {
    var [commands, params, programOptions] = require('./lib/distillator.js')(argv);
} catch (e) {
    logError(e);
    process.exit(1);
}

if (programOptions.watch && (programOptions.file || programOptions.isBodyFile)) {
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
}

// the starter function
const trigger = () => {
    steker(commands, params, programOptions)
        .then((res) => {
            logSuccess(res);
            process.exit(0);
        })
        .catch((e) => {
            logError(e);
            // exit program
            process.exit(1);
        });
};

// execute program
trigger();
