#!/usr/bin/env node

const program = require('commander');
const client = require('./client.js')();
const editor = require('./editor.js');

program
    .version('0.0.1', '-v --version')
    .option('-e, --editor', 'Use your editor to write the parameters of the request')
    .arguments('[commands...]')
    .action((args) => {
        let evalStr = `client.${args.join('.')}`;

        if (program.editor) {
            editor().then((res) => {
                eval(`${evalStr}(res)`);
            });
        } else {
            eval(`${evalStr}()`);
        }
    })
    .parse(process.argv);
