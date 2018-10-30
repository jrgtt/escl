const validFilePath = (filePath) => {
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

module.exports.validFilePath = validFilePath;
module.exports.validList = validList;
module.exports.validListOrString = validListOrString;

