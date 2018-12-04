module.exports = (params, { bodybuilder }) => {
    const query = bodybuilder().query('match_all').build();
    return query;
};
