import { ConfigModule, ConfigService } from '@nestjs/config'
import { Test } from '@nestjs/testing'

let cachedService: ConfigService
let uncachedService: ConfigService

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
			ConfigModule.forRoot({
				cache: true,
			}),
		],
	}).compile()

	const uncachedModule = await Test.createTestingModule({
		imports: [
			ConfigModule.forRoot({
				cache: false,
			}),
		],
	}).compile()

	cachedService = cachedModule.get(ConfigService)
	uncachedService = uncachedModule.get(ConfigService)
}
