export default {
  env: {
    node: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  rules: {
    semi: 2,
    indent: ['error', 2, { SwitchCase: 1 }],
    'no-empty': 2,
    'no-dupe-args': 2,
    'no-extra-semi': 2,
    'no-lone-blocks': 2,
    'no-empty-function': 2,
    'no-multi-spaces': 2,
    'no-return-assign': 2,
    'no-self-assign': 2,
    'no-self-compare': 2,
    'no-unmodified-loop-condition': 2,
    curly: 2,
    'max-len': ['error', { code: 80 }],
    'max-depth': 2,
    'max-lines': ['error', { skipBlankLines: true }],
    'no-implicit-globals': 2,
    camelcase: 2,
    'brace-style': 2,
    'id-length': ['error', { min: 2, max: 20 }],
    'func-call-spacing': 2,
    'no-lonely-if': 2,
    'new-cap': ['error', { newIsCap: true, capIsNew: true }],
    'no-multiple-empty-lines': 2,
    'no-mixed-spaces-and-tabs': 2,
    'no-var': 2,
    'no-global-assign': 2,
    'no-else-return': 2,
    'object-curly-spacing': 2,
    'no-inner-declarations': ['error', 'both'],
    'no-unexpected-multiline': 2,
    'for-direction': 2
  }
};
