const vm = require('vm');

const client = require('./client.js')();
const repl = require('repl');

const r = repl.start();

r.context = vm.createContext({
    ...r.context,
    escli: client,
});
