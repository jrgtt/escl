#!/usr/bin/env node

const yargs = require('yargs');
const editor = require('./editor.js');

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

// remove these options from the params
delete options.e;
delete options.editor;
delete options.b;
delete options.body;
delete options.f;
delete options.file;

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
