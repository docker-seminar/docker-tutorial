// @ts-check
import eslint from '@eslint/js'
import jsdoc from 'eslint-plugin-jsdoc'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
	{
		ignores: ['eslint.config.mjs'],
	},
	eslint.configs.recommended,
	jsdoc.configs['flat/recommended-typescript'],
	...tseslint.configs.recommendedTypeChecked,
	eslintPluginPrettierRecommended,
	{
		languageOptions: {
			globals: {
				...globals.node,
				...globals.jest,
			},
			ecmaVersion: 5,
			sourceType: 'module',
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	{
		plugins: { jsdoc },
		rules: {
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-floating-promises': 'warn',
			'@typescript-eslint/no-unsafe-argument': 'warn',
			'jsdoc/require-example': [
				'warn',
				{
					contexts: [
						// Only warn for standalone functions, not methods
						'FunctionDeclaration:not([parent.type="MethodDefinition"])',
						'ArrowFunctionExpression[async=false][generator=false]',
					],
				},
			],
			'jsdoc/no-blank-block-descriptions': 'warn',
			'jsdoc/tag-lines': 'off',
		},
	},
	{
		files: ["**/*.spec.ts", "**/*.test.ts"],
		rules: {
			"@typescript-eslint/unbound-method": "off"
		}
	}
)
