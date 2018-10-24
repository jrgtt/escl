const { spawn } = require('child_process');
var editor = process.env.EDITOR || 'vi';
var filepath = '/tmp/something.js';

var child = spawn(editor, [filepath], {
    stdio: 'inherit'
});

child.on('exit', function (e, code) {
    const file = require(filepath);
    console.log('file', file);
    console.log("finished");
});
