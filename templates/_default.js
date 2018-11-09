const recast = require('recast');
const builder = recast.types.builders;

// initial code
let code = "module.exports = {}";

// parse
const ast = recast.parse(code);

module.exports = (inheritOptions = {}) => {
    // add cli options to object tree
    Object.keys(inheritOptions).forEach((k) => {
        ast.program.body[0].expression.right.properties.push(builder.objectProperty(
            builder.identifier(k),
            builder.literal(inheritOptions[k])
        ));
    });

    return recast.prettyPrint(ast).code;
};
