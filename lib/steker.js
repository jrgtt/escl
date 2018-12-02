const editor = require('../editor.js');
const { validClientCall } = require('../utils/validation.js');

const steker = (client) => async (commands, params = {}, options = {}) => {
    const fn = validClientCall(client)(commands);

    if (options.edit) {
        return editor(options.file || null, params).then((fileParams) => {
            return fn.call(client, fileParams);
        });
    } else {
        // use file as full parameter (if provided)
        let fileParams = {};

        if (options.file) {
            if (require.cache[require.resolve(options.file)]) {
                delete require.cache[require.resolve(options.file)];
            }
            fileParams = require(options.file);

            // if exported value is a function serve the params and additional modules
            if (typeof fileParams === 'function') {
                fileParams = fileParams(params, {
                    bodybuilder: require('bodybuilder')
                });
            }
        }

        let body = options.body;
        // if body is a string it means it was passed as a file
        if (typeof body === 'string') {
            body = require(body);
        }

        params = {
            ...fileParams,
            // parameters that comes as args override file parameters
            ...body && { body },
            ...params
        };

        return fn.call(client, params);
    }
};

module.exports = steker;
