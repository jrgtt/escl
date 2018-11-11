const editor = require('../editor.js');

const steker = async ([namespaceOrCmd, cmd], options) => {
    const keep = { ...options };

    // remove these options from the params
    delete options.e;
    delete options.editor;
    delete options.b;
    delete options.body;
    delete options.f;
    delete options.file;

    // the elasticsearch client
    const client = require('../client.js')();

    // TODO: throw some error if namespace not found
    const fn = cmd ? client[namespaceOrCmd][cmd] : client[namespaceOrCmd];

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
