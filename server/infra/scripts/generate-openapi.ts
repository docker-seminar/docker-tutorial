import { NestFactory } from '@nestjs/core'
import { AppModule } from '../../src/app.module'
import { setupSwagger } from '../../src/swagger/swagger.config'

/**
 * Generates the OpenAPI specification as a static file by bootstrapping the NestJS application and running the Swagger setup logic.
 *
 * This script is intended for use in CI environments (e.g., GitHub Actions) or for manual documentation generation during development.
 *
 * The output is written to `server/html/api/openapi.json` when `process.env.GITHUB_ACTIONS` is set to `'true'`.
 *
 * @example
 * // Run this script using a Node-compatible runner:
 *  npx tsx scripts/generate-openapi.ts
 */
async function generateOpenApi() {
	const app = await NestFactory.create(AppModule)
	await setupSwagger(app)
	await app.close()
}

generateOpenApi()
	.then(() => {
		console.log('✅ OpenAPI spec generated.')
		process.exit(0)
	})
	.catch(err => {
		console.error('❌ Failed to generate OpenAPI spec:', err)
		process.exit(1)
	})
