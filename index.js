#!/usr/bin/env node

const program = require('commander');
const client = require('./client.js')();

program
    .version('0.0.1', '-v --version')
    .arguments('[args...]')
    .action((args) => {
        eval('client.' + args.join('.') + "()");
    })
    .parse(process.argv);
