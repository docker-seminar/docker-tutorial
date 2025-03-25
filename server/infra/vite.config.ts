import { defineConfig } from 'vitest/config'
import swc from 'unplugin-swc'

export default defineConfig({
	test: {
		include: ['**/*.spec.ts'],
		globals: true,
		reporters: ['verbose'],
	},
	plugins: [
		// This is required to build the test files with SWC
		swc.vite({
			// Explicitly set the module type to avoid inheriting this value from a `.swcrc`
			module: { type: 'es6' },
		}),
	],
})
