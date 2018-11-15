const configuration = require('cosmiconfig')('escli');

// Extended and biased configuration, can be overriden by the config file below
const defaultConfig = {
    // print tab width indentation value
    tabWidth: 2,
    // always print responses in pretty format
    pretty: false,
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
const fileConfig = configuration.searchSync().config;

const config = {
    ...defaultConfig,
    ...fileConfig
};

module.exports = config;
