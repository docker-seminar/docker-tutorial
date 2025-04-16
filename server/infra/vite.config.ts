import { defineConfig } from 'vitest/config'
import swc from 'unplugin-swc'

const isGitHubActions = process.env.GITHUB_ACTIONS

export default defineConfig({
	test: {
		include: ['**/*.spec.ts'],
		globals: true,
		reporters: isGitHubActions ? ['verbose', 'github-actions', 'html'] : ['verbose'],
	},
	plugins: [
		swc.vite({
			module: { type: 'es6' },
		}),
	],
})
