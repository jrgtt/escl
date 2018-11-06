const { Client } = require('elasticsearch');
const configuration = require('cosmiconfig')('escli');

// Configuration to fallback in case of no configuration file provided
const defaultConfig = {
    config: {
        client: {
            host: 'http://localhost:9200',
            log: 'trace'
        }
    }
};

/**
 * The aim of this project is not to help you build an elasticsearch
 * client connection.  Hence I assume that the information and custom
 * configuration should be provided by the user.
 *
 * To pass those configuration create a `.esclirc` (supported in
 * different extensions such as `js`, `yaml`, `json`) file within your
 * project or add a key named `escli` to your package.json.
 *
 * In the configuration add a `client` key where it will be passed
 * directly to instantiate a Elasticsearch.Client.
 *
 * In doubt check the documentation:
 * https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/configuration.html
 **/
const escliConfig = configuration.searchSync() || defaultConfig;

module.exports = () => new Client(escliConfig.config.client);
