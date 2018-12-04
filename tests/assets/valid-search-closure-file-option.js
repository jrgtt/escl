module.exports = ({ index }, { bodybuilder }) => {
    const query = bodybuilder().query('match_all').build();

    return {
        index,
        body: query,
    };
};
