const vm = require('vm');

const client = require('./client.js')();
const repl = require('repl');
const apis = require('./node_modules/elasticsearch/src/lib/apis/6_3.js');

const r = repl.start();

r.context = vm.createContext({
    ...r.context,
    escli: client,
    apis
});
