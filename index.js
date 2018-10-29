#!/usr/bin/env node

const program = require('commander');
const client = require('./client.js')();
const editor = require('./editor.js');

const loadValidFile = (filePath) => {
    const path = require('path');

    if (
        !require('fs').statSync(filePath).isFile()
        || !['.js', '.json'].includes(path.extname(filePath))
    ) {
        throw new Error(`${filePath} is not a valid request file`);
    }

    return require(path.resolve(filePath));
};

program
    .version('0.0.1', '-v --version')
    .option('-e, --editor', 'Use your editor to write the parameters of the request')
    .option('-f, --file <path>', 'JS or JSON file to be used as request', loadValidFile)
    .arguments('[commands...]')
    .action((args) => {
        let evalStr = `client.${args.join('.')}`;

        if (program.editor) {
            editor().then((res) => {
                eval(`${evalStr}(res)`);
            });
        } else {
            const res = program.file || {};
            eval(`${evalStr}(res)`);
        }
    })
    .parse(process.argv);
