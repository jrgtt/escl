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

    let cmds = [...commands];

    // defaults to _info command if no command is passed
    if (cmds.length === 0) {
        cmds = ['_info'];
    }

    if (file && body) {
        throw new Error('body and option can\'t be sent together');
    }

    if (edit && watch) {
        throw new Error('watch and edit option are currently not supported together');
    }

    // escli specific options
    const programOptions = {
        edit,
        file,
        body,
        watch
    };

    if (typeof programOptions.body === 'string') {
        programOptions.isBodyFile = true;
    }

    return [
        cmds,
        params,
        programOptions
    ];
};
