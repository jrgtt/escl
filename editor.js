const { spawn } = require('child_process');
const editor = process.env.EDITOR || 'vi';

const generateFallbackFile = () => {
    const fs = require('fs');
    const path = require('path');

    // templates are js parsed strings
    const templateString = require('./templates/_default.js');

    // generate a random file name
    const generatedFile = path.join('/tmp', `${Math.random().toString(36).substring(7)}.js`);

    // like copy, but node doesn't complain about it
    fs.writeFileSync(generatedFile, templateString);

    return [
        // send the path of the new file
        generatedFile,
        // provide function to delete the file
        () => fs.unlinkSync(generatedFile)
    ];
};

/**
 * Will call out your default editor to write or edit a file to be used as
 * parameter for command
 *
 * @param {String} filepath path of the file to edit, pass nothing to create one
 * @param {String} template will look for templates for the requisition
 * @returns {Promise} will give back to the contents of the file
 */
module.exports = (filepath) => {
    let afterEdit = () => {}; // noop function

    // if no file is provided generate one from templates
    if (!filepath) {
        [ filepath, afterEdit ] = generateFallbackFile();
    }

    return new Promise((resolve) => {
        spawn(editor, [filepath], { stdio: 'inherit' }).on('exit', (e) => {
            if (e) throw e;

            try {
                resolve(require(filepath));
            } catch (fe) {
                throw fe;
            }

            afterEdit();
        });
    });
};
