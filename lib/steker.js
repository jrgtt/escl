const editor = require('../editor.js');
const validClientCall = require('../utils/validation.js');

const steker = (client) => async ([_namespaceOrCmd, cmd], params = {}, options = {}) => {
    // es commands/namespaces comes prefixed with `_` (underscore)
    const fn = validClientCall(client)(_namespaceOrCmd.slice(1), cmd);

    // TODO: refactor editor call to avoid two similar calls using the client
    if (options.editor) {
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

        params = {
            ...fileParams,
            // parameters that comes as args override file parameters
            ...options.body && { body: require(options.body) },
            ...params
        };
        return fn.call(client, params);
    }
};

module.exports = steker;
