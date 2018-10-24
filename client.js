const elasticsearch = require('elasticsearch');
const configuration = require('cosmiconfig')('escli');

let defaultClientConfig = {
    host: 'http://localhost:9200',
    log: ['error', 'trace'],
    apiVersion: '6.3'
};

// search for `escli` in configuration files
const customClientOptions = configuration.searchSync() || { config: {} };

let config = {
    ...defaultClientConfig,
    ...customClientOptions.config,
};

module.exports = () => new elasticsearch.Client(config);
