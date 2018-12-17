const validFilepath = (filePath) => {
    const path = require('path');
    const fs = require('fs');

    if (
        !fs.statSync(filePath).isFile() ||
        !['.js', '.json'].includes(path.extname(filePath))
    ) {
        throw new Error(`${filePath} is not a valid request file`);
    }

    return path.resolve(filePath);
};

const validList = (values) => values.split(/,/).map((s) => s.trim());

// same as validList, but will return a string if list has only one element
const validListOrString = (values) => {
    values = validList(values);
    return values.length === 1 ? values[0] : values;
};

const validJSON = (value) => {
    let res = null;

    try {
        res = validFilepath(value);
    } catch (e) {
        try {
            res = JSON.parse(value);
        } catch (e) {
            throw new Error(`"${value}" is not valid filepath or a JSON serializable string`);
        }
    }

    return res;
};

const validClientCall = (client) => ([_namespaceOrCmd, cmd]) => {
    // the slice happens because commands start with underscore
    let fn = client[_namespaceOrCmd.slice(1)];

    if (typeof fn === 'undefined') {
        throw new Error(`${_namespaceOrCmd} is not a valid command`);
    } else if (fn.transport && !cmd) {
        throw new Error(`${_namespaceOrCmd} requires another subcommand`);
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

    return fn;
};

module.exports.validFilepath = validFilepath;
module.exports.validList = validList;
module.exports.validListOrString = validListOrString;
module.exports.validJSON = validJSON;
module.exports.validClientCall = validClientCall;
