const editor = require('../editor.js');

const steker = (client) => async ([namespaceOrCmd, cmd], params = {}, options = {}) => {
    // TODO: throw some error if namespace not found
    const fn = cmd ? client[namespaceOrCmd][cmd] : client[namespaceOrCmd];

    // TODO: refactor editor call to avoid two similar calls using the client
    if (options.editor) {
        editor(options.file || null, params).then((fileParams) => {
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
