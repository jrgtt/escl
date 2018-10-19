const elasticsearch = require('elasticsearch');

module.exports = () => new elasticsearch.Client({
    host: 'localhost:9200',
    log: ['error', 'trace'],
    apiVersion: '6.3',
});
