const recast = require('recast');
const builder = recast.types.builders;

// initial code
let code = "module.exports = {}";

// parse
const ast = recast.parse(code);

// create new property
const newProperty = builder.objectProperty(
    builder.identifier('index'),
    builder.literal('<% indexValue %>')
);

ast.program.body[0].expression.right.properties.push(newProperty);

module.exports = recast.prettyPrint(ast).code;
