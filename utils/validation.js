module.exports.validFilePath = (filePath) => {
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

module.exports.validList = (indices) => indices.split(/,/).map((s) => s.trim());
