import { ConfigModule, ConfigService } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { bench } from 'vitest'

let cachedService: ConfigService
let uncachedService: ConfigService

beforeAll(async () => {
	await setupServices()
})

describe('AppModule', () => {
	bench('with cache', () => {
		cachedService.get('NODE_ENV')
	})

	bench('without cache', () => {
		uncachedService.get('NODE_ENV')
	})
})

/**
 * Bootstraps two independent NestJS modules for benchmarking:
 * one with Config caching enabled, and one without.
 *
 * This sets up two ConfigService instances to be used in performance tests
 * for comparing cached vs. uncached access to environment variables.
 *
 * @example
 * await setupServices()
 * console.log(cachedService.get('NODE_ENV'))
 *
 */
async function setupServices() {
	process.env.NODE_ENV = 'benchmark'

	const cachedModule = await Test.createTestingModule({
		imports: [
			await ConfigModule.forRoot({
				cache: true,
			}),
		],
	}).compile()

	const uncachedModule = await Test.createTestingModule({
		imports: [
			await ConfigModule.forRoot({
				cache: false,
			}),
		],
	}).compile()

	cachedService = cachedModule.get(ConfigService)
	uncachedService = uncachedModule.get(ConfigService)
}
