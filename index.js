#!/usr/bin/env node

const program = require('commander');
const client = require('./client.js')();
const editor = require('./editor.js');

const validateFilePath = (filePath) => {
    const path = require('path');
    const fs = require('fs');

    if (
        !fs.statSync(filePath).isFile() ||
        !['.js', '.json'].includes(path.extname(filePath))
    ) {
        throw new Error(`${filePath} is not a valid request file`);
    }

    return path.resolve(filePath);
};

program
    .version('0.0.1', '-v --version')
    .option(
        '-e, --editor',
        'Use your editor to write the parameters of the request'
    )
    .option(
        '-f, --file <path>',
        'JS or JSON file to be used as body request',
        validateFilePath
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
            const res = program.file || {};
            fn.call(client, res);
        }
    })
    .parse(process.argv);
