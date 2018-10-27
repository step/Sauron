const Ajv = require('ajv');
const ajv = new Ajv({ verbose: true });
const fs = require('fs');

let fileName = process.argv[2] || './sample.json';
let schemaName = process.argv[3] || './schema.json';

let schema = JSON.parse(fs.readFileSync(schemaName, 'utf8'));
let json = JSON.parse(fs.readFileSync(fileName, 'utf8'));

let validate = ajv.compile(schema);
let result = validate(json);

if (result) {
  console.log(`${fileName} successfully validated against ${schemaName}`);
  process.exit(0);
}

validate.errors.forEach(({ keyword, dataPath, message, data }) => {
  console.log(`${dataPath} - ${keyword} - ${message} - ${data}`);
});

process.exit(1);
