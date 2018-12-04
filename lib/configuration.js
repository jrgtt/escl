const configuration = require('cosmiconfig')('escli');

// Extended and biased configuration, can be overriden by the config file below
const defaultConfig = {
    // json tab width for responses
    printWidth: 2,
    client: {
        host: 'http://localhost:9200',
        log: false,
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
let fileConfig = configuration.searchSync();
fileConfig = fileConfig ? fileConfig.config : {};

const config = {
    ...defaultConfig,
    ...fileConfig
};

module.exports = config;
