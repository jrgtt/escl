module.exports = (argv) => {
    /* eslint-disable no-unused-vars */
    const {
        '$0': _binPath, // location of the script (not used)

        // extract commands that come in `_` key
        _: commands,

        edit,
        e,
        file,
        f,
        body,
        b,
        watch,
        w,

        // non escli options become client parameters
        ...params
    } = argv;
    /* eslint-enable no-unused-vars */

    // escli specific options
    const programOptions = {
        edit,
        file,
        body,
        watch
    };

    return [
        commands,
        params,
        programOptions
    ];
};
