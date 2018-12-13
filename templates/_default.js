const recast = require('recast');
const builder = recast.types.builders;

// initial code
let code = 'module.exports = {};';

module.exports = (inheritOptions = {}) => {
    // the abstract syntax tree
    const ast = recast.parse(code);

    // add cli options to object tree
    Object.keys(inheritOptions).forEach((k) => {
        const val = inheritOptions[k];

        ast.program.body[0].expression.right.properties.push(
            builder.objectProperty(
                builder.identifier(k),
                builder.literal(val)
            )
        );
    });

    return recast.prettyPrint(ast).code;
};
