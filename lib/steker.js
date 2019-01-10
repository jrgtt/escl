const editor = require('../editor.js');
const requireFileParams = require('./requireFileParams.js');
const { validClientCall } = require('../utils/validation.js');

const steker = (client) => async (commands, params = {}, options = {}) => {
    const fn = validClientCall(client)(commands);

    if (options.edit) {
        // escl will care for a file if null is returned
        let fileToEdit = null;

        if (options.isBodyFile) {
            fileToEdit = options.body;
        } else if (options.file) {
            fileToEdit = options.file;
        } else if (!options.isBodyFile && options.body) {
            params = {
                ...params,
                body: options.body
            };
        }

        let fileParams = await editor(fileToEdit, params);

        if (options.isBodyFile) {
            params = {
                ...params,
                body: fileParams,
            };
        } else {
            params = {
                ...params,
                ...fileParams
            };
        }
    } else {
        // use file as full parameter (if provided)
        let fileParams = {};

        if (options.file) {
            fileParams = requireFileParams(options.file, params);
        }

        let body = options.body;
        if (options.isBodyFile) {
            body = requireFileParams(body, params);
        }

        params = {
            ...fileParams,
            // parameters that comes as args override file parameters (debatable)
            ...body && { body },
            ...params
        };
    }

    return fn.call(client, params);
};

module.exports = steker;
