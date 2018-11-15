#!/usr/bin/env node
/* eslint-disable no-console */

const yargs = require('yargs');

// the elasticsearch client
const client = require('./client.js')();

// the command runner
const steker = require('./lib/steker.js')(client);

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
      .option('pretty', {
          describe: 'Print a pretty JSON format',
          type: 'boolean'
      })
      .option('watch', {
          alias: 'w',
          describe: 'Watch file for changes and redo commmand',
          type: 'string',
          coerce: validFilepath
      })
      .argv;

/* eslint-disable no-unused-vars */
const {
    '$0': _binPath, // location of the script (not used)

    // extract commands that come in `_` key
    _: [namespaceOrCmd, cmd],

    editor,
    e,
    file,
    f,
    body,
    b,
    pretty,
    watch,
    w,

    // non escli options become client parameters
    ...params
} = argv;
/* eslint-enable no-unused-vars */

const programOptions = {
    editor,
    file: file || watch,
    body
};

if (watch) {
    // pool watch function for later
    setTimeout(() => {
        // TODO: according to Node.js docs `.watch` is better than `.watchFile`
        // perhaps should create a setInterval here for pooling the file...
        // can also be a config property
        require('fs').watchFile(watch, () => {
            trigger()
        });
    }, 0);
}

// the starter function
const trigger = () => {
    steker([namespaceOrCmd, cmd], params, programOptions)
        .then((res) => console.log(JSON.stringify(res, null, pretty ? 2 : 0)))
        .catch((e) => {
            // In case error comes from an elasticsearch operation
            if (typeof e.toJSON === 'function') {
                console.error(e.toJSON())
            } else {
                console.error(e);
            }
        });
};

// execute program
trigger();
