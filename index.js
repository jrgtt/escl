#!/usr/bin/env node

const program = require('commander');
const client = require('./client.js')();
const editor = require('./editor.js');

const { validFilePath, validList } = require('./utils/validation.js');

program
    .version('0.0.1', '-v --version')
    .option(
        '-e, --editor',
        'Use your editor to write the parameters of the request'
    )
    .option(
        '-f, --file <path>',
        'JS or JSON file to be used as body request',
        validFilePath
    )
    .option(
        '--index <index>',
        'Index or list of indices to operate on.',
        validList
    )
    .arguments('<namespaceOrCmd> [cmd]')
    .action((namespaceOrCmd, cmd) => {
        // apply namespace if provided
        const fn = cmd ? client[namespaceOrCmd][cmd] : client[namespaceOrCmd];

        if (program.editor) {
            editor(program.file || null).then((res) => {
                fn.call(client, res);
            });
        } else {
            let res = program.file ? require(program.file) : {};
            if (program.index) {
                res = {
                    ...res,
                    index: program.index,
                };
            }
            fn.call(client, res);
        }
    })
    .parse(process.argv);
