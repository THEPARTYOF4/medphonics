const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const ajv = new Ajv({ allErrors: true, removeAdditional: false });
addFormats(ajv);

function compileSchema(schema) {
  return ajv.compile(schema);
}

// Returns express middleware that validates req.body against provided schema
function validateBody(schema) {
  const validate = compileSchema(schema);
  return (req, res, next) => {
    const valid = validate(req.body);
    if (valid) return next();
    const errors = (validate.errors || []).map(e => ({ path: e.instancePath || e.dataPath, message: e.message }));
    return res.status(400).json({ error: 'validation error', details: errors });
  };
}

// Validate params using a schema against req.params
function validateParams(schema) {
  const validate = compileSchema(schema);
  return (req, res, next) => {
    const valid = validate(req.params);
    if (valid) return next();
    const errors = (validate.errors || []).map(e => ({ path: e.instancePath || e.dataPath, message: e.message }));
    return res.status(400).json({ error: 'validation error', details: errors });
  };
}

module.exports = { validateBody, validateParams };
