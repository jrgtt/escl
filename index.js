#!/usr/bin/env node

const yargs = require('yargs');
const editor = require('./editor.js');

const { validFilePath, validListOrString } = require('./utils/validation.js');

const argv = yargs
      .command('$0', 'Refer to elasticsearch documentation to check which methods you can use')
      .option('editor', {
          alias: 'e',
          describe: 'Use your default editor or provide one to be used',
          type: 'boolean'
      })
      .option('file', {
          alias: 'f',
          describe: 'JS/JSON file to be sent as parameters',
          type: 'string',
          coerce: validFilePath
      })
      .option('body', {
          alias: 'b',
          describe: 'JS/JSON file to be sent as body key in parameters',
          type: 'string',
          coerce: validFilePath
      })
      .help()
      .argv;

const {
    // location of the script (not used)
    '$0': _binPath,

    // extract commands that come in `_` key
    _: [namespaceOrCmd, cmd],

    // rest of the options passed
    ...options
} = argv;

// the elasticsearch client
const client = require('./client.js')();

// TODO: throw some error if namespace not found
const fn = cmd ? client[namespaceOrCmd][cmd] : client[namespaceOrCmd];

if (argv.editor) {
    editor(argv.file || null).then((res) => {
        fn.call(client, res);
    });
} else {
    // use file as full parameter (if provided)
    let res = argv.file ? require(argv.file) : {};

    res = {
        ...res,
        ...argv.body && { body: require(argv.body) },
        ...options
    };
    fn.call(client, res);
}
