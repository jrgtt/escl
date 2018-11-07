const { spawn } = require('child_process');
const editor = process.env.EDITOR || 'vi';

const generateFallbackFile = (template) => {
    const fs = require('fs');
    const path = require('path');

    // templates are simply js files
    const templateFile = path.join(__dirname, 'templates', `${template}.js`);

    // generate a random file name
    const generatedFile = path.join('/tmp', `${Math.random().toString(36).substring(7)}.js`);

    // like copy, but node doesn't complain about it
    fs.writeFileSync(generatedFile, fs.readFileSync(templateFile));

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
module.exports = (filepath, template = '_default') => {
    let afterEdit = () => {}; // noop function

    // if no file is provided generate one from templates
    if (!filepath) {
        [ filepath, afterEdit ] = generateFallbackFile(template);
    }

    return new Promise((resolve, reject) => {
        spawn(editor, [filepath || fallbackFile], {
            stdio: 'inherit'
        }).on('exit', (e, code) => {
            resolve(require(filepath));
            afterEdit();
        });
    });
};
