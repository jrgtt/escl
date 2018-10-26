const { spawn } = require('child_process');
const editor = process.env.EDITOR || 'vi';
const filepath = '/tmp/something.js';

module.exports = () =>
    new Promise((resolve, reject) => {
        spawn(editor, [filepath], {
            stdio: 'inherit'
        }).on('exit', (e, code) => {
            resolve(require(filepath));
        });
    });
