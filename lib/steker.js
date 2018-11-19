const editor = require('../editor.js');

const steker = (client) => async ([_namespaceOrCmd, cmd], params = {}, options = {}) => {
    // es commands/namespaces must be prefixed with `_` (underscore)
    const namespaceOrCmd = _namespaceOrCmd.slice(1);

    let fn = client[namespaceOrCmd];

    if (typeof fn === 'undefined') {
        throw new Error(`${_namespaceOrCmd} is not a valid command`);
    } else {
        if (cmd) {
            // if cmd is passed, try to get it from client
            fn = fn[cmd];
            // but throw error if it doesn't exists
            if (typeof fn === 'undefined') {
                throw new Error(`${cmd} is not a valid subcommand from ${_namespaceOrCmd}`);
            }
        }
    }

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
