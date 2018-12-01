const { Client } = require('elasticsearch');

module.exports = (clientConfig) => {
    /*
     * Couldn't find a cleaner way of checking if the client is already an
     * instance of client or a direct object, checking if a transport key is
     * set was the best attempt so far...
     *
     * Perhaps it can be improved.
     */
    if (clientConfig.transport) {
        return clientConfig;
    }

    // otherwise instantiate the object ourselves
    return new Client(clientConfig);
};
