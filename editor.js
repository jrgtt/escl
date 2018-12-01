const { spawn } = require('child_process');
const editor = process.env.EDITOR || 'vi';

const generateFallbackFile = (options = {}) => {
    const fs = require('fs');
    const path = require('path');

    // this file will be generated under /tmp/ to make the editions
    const generatedFile = path.join('/tmp', '_escli.js');

    // generate file if it doesn't already exists
    if (!fs.existsSync(generatedFile)) {
        // a template will be build on top of the passed options
        const templateString = require('./templates/_default.js')(options);

        // like copy, but node doesn't complain about it
        fs.writeFileSync(generatedFile, templateString);
    }

    return generatedFile;
};

/**
 * Will call out your default editor to write or edit a file to be used as
 * parameter for command
 *
 * @param {String} filepath path of the file to edit, pass nothing to create one
 * @returns {Promise} will give back to the contents of the file
 */
module.exports = (filepath, options = {}) => {
    // if no file is provided generate one from templates
    filepath = typeof filepath === 'string'
        ? filepath
        : generateFallbackFile(options);

    return new Promise((resolve) => {
        spawn(editor, [filepath], { stdio: 'inherit' }).on('exit', (e) => {
            if (e) throw e;

            try {
                resolve(require(filepath));
            } catch (fe) {
                throw fe;
            }
        });
    });
};
