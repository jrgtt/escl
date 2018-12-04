const editor = require('../editor.js');
const requireFileParams = require('./requireFileParams.js');
const { validClientCall } = require('../utils/validation.js');

const steker = (client) => async (commands, params = {}, options = {}) => {
    const fn = validClientCall(client)(commands);

    if (options.edit) {
        params = await editor(options.file || options.body || null, params);
    } else {
        // use file as full parameter (if provided)
        let fileParams = {};

        if (options.file) {
            fileParams = requireFileParams(options.file, params);
        }

        let body = options.body;
        // if body is a string it means it was passed as a file
        if (typeof body === 'string') {
            body = requireFileParams(body, params);
        }

        params = {
            ...fileParams,
            // parameters that comes as args override file parameters
            ...body && { body },
            ...params
        };
    }

    return fn.call(client, params);
};

module.exports = steker;
