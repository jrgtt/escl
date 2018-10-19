const vm = require('vm');

const elasticsearch = require('elasticsearch');
const repl = require('repl');

const client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

const r = repl.start();

r.context = vm.createContext({
    ...r.context,
    escli: client,
    elasticsearch,
});
