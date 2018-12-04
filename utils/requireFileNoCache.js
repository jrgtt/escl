/**
 * In cases where file is being watched requiring file for the second time in
 * the same program execution will cause the file to be cached. This function
 * prevents it by deleting the cache if found.
 *
 * @param {String} filepath
 * @returns {Object}
 */
module.exports = (filepath) => {
    if (require.cache[require.resolve(filepath)]) {
        delete require.cache[require.resolve(filepath)];
    }

    return require(filepath);
};
