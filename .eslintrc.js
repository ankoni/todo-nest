module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'prettier',
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/semi': ['error', 'never'],
        indent: [
            'error',
            4,
            {
                FunctionDeclaration: {
                    body: 1,
                    parameters: 1,
                },
                FunctionExpression: {
                    body: 1,
                    parameters: 1,
                },
                StaticBlock: {
                    body: 1
                },
                ObjectExpression: 1,
                MemberExpression: 1,
                outerIIFEBody: 'off',
                "ignoredNodes": ["PropertyDefinition"]
            },
        ],
        'prettier/prettier': 'off',
        "newline-per-chained-call": ['error', { "ignoreChainWithDepth": 2 }],
    },
};
