const { Client } = require('elasticsearch');

module.exports = (clientConfig) => new Client(clientConfig);
