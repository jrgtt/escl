/* eslint-disable no-console */
const config = require('./configuration.js');

const logger = {};

logger.logSuccess = (res) => {
    if (config.silent) {
        return ;
    }

    if (res instanceof Object) {
        console.log(JSON.stringify(res, null, config.printWidth));
    } else {
        console.log(res);
    }
};

logger.logError = (e) => {
    if (config.silent) {
        return ;
    }

    // In case error comes from an elasticsearch operation
    if (typeof e.toJSON === 'function') {
        console.error(e.toJSON());
    } else {
        console.error(e);
    }
};

module.exports = logger;
