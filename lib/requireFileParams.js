const requireFileNoCache = require('../utils/requireFileNoCache.js');

module.exports = (filepath, cliParams = {}) => {
    let fileParams = requireFileNoCache(filepath);

    if (typeof fileParams === 'function') {
        fileParams = fileParams(cliParams, {
            bodybuilder: require('bodybuilder')
        });
    }

    return fileParams;
};
