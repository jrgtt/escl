const editor = require('../editor.js');

const steker = (client) => async ([namespaceOrCmd, cmd], options) => {
    const keep = { ...options };

    // TODO: Most of the variables here should be already filtered
    // Not the place put these logic
    delete options.e;
    delete options.editor;
    delete options.b;
    delete options.body;
    delete options.f;
    delete options.file;

    // TODO: throw some error if namespace not found
    const fn = cmd ? client[namespaceOrCmd][cmd] : client[namespaceOrCmd];

    // TODO: refactor editor call to avoid two similar calls using the client
    if (keep.editor) {
        editor(keep.file || null, options).then((res) => {
            return fn.call(client, res);
        });
    } else {
        // use file as full parameter (if provided)
        let res = keep.file ? require(keep.file) : {};

        res = {
            ...res,
            ...keep.body && { body: require(keep.body) },
            ...options
        };
        return fn.call(client, res);
    }
};

module.exports = steker;
