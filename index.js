#!/usr/bin/env node

const program = require('commander');
const client = require('./client.js')();

program.version('0,0,1').parse(process.argv);

client.info();
