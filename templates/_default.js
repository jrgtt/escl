const recast = require('recast');
const builder = recast.types.builders;

// initial code
let code = 'module.exports = {};';

const buildObject = (obj) => {
    const properties = Object.keys(obj).map((k) => {
        let val = obj[k];

        if (typeof val === 'object') {
            val = buildObject(val);
        } else {
            val = builder.literal(val);
        }

        return builder.objectProperty(
            builder.identifier(k),
            val
        );
    });

    return builder.objectExpression(properties);
};

module.exports = (inheritOptions = {}) => {
    // the abstract syntax tree
    const ast = recast.parse(code);

    // add cli options to object tree
    const result = buildObject(inheritOptions);

    // put newly created object as right side of the ast
    ast.program.body[0].expression.right = result;

    return recast.prettyPrint(ast).code;
};
