#!/usr/bin/env node

const yargs = require('yargs');

const { validFilepath, validJSON } = require('./utils/validation.js');

const argv = yargs
      .command('$0', 'Refer to elasticsearch documentation to check which methods you can use')
      .option('editor', {
          alias: 'e',
          describe: 'Use your editor to edit the request',
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
      .argv;

const {
    // eslint-disable-next-line
    '$0': _binPath, // location of the script (not used)

    // extract commands that come in `_` key
    _: [namespaceOrCmd, cmd],

    // rest of the options passed
    ...options
} = argv;

require('./lib/steker.js')([namespaceOrCmd, cmd], options)
    .catch(() => {}); // avoids closing the program in unhandled exception
