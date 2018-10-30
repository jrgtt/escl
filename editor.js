const { spawn } = require('child_process');
const editor = process.env.EDITOR || 'vi';

// file to use in case none is provided
const fallbackFile = '/tmp/scracht.js';

module.exports = (filePath) => {
    filePath = filePath || fallbackFile;

    return new Promise((resolve, reject) => {
        spawn(editor, [filePath || fallbackFile], {
            stdio: 'inherit'
        }).on('exit', (e, code) => {
            resolve(require(filePath));
        });
    });
};
