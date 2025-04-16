import { dirname, resolve } from 'path'
import { mkdirSync, writeFileSync } from 'fs'

import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import metadata from '../metadata'

const isGitHubActions = process.env.GITHUB_ACTIONS === 'true'

/**
 * Sets up Swagger (OpenAPI) documentation for the application.
 *
 * This will register the `/api` endpoint where Swagger UI will be available.
 * The documentation includes metadata like title, description, version and contact.
 *
 * @param app - The NestJS application instance
 *
 * @example
 * import { setupSwagger } from './swagger'
 * import { NestFactory } from '@nestjs/core'
 * import { AppModule } from './app.module'
 *
 * async function bootstrap() {
 *     const app = await NestFactory.create(AppModule)
 *     setupSwagger(app)
 *     await app.listen(3000)
 * }
 */
export async function setupSwagger(app: INestApplication) {
	const documentBuilderConfig = new DocumentBuilder()
		.setTitle('Docker Tutorial')
		.setDescription('The Docker Tutorial API description.')
		.setContact('SeungBin Kim', 'https://github.com/docker-seminar/docker-tutorial', 'luxorienskim@gmail.com')
		// Todo: Use environment variable to set version dynamically
		.setVersion('0.0.0')
		.build()

	await SwaggerModule.loadPluginMetadata(metadata)
	const documentFactory = () =>
		SwaggerModule.createDocument(app, documentBuilderConfig, {
			autoTagControllers: true,
		})
	SwaggerModule.setup('api', app, documentFactory)

	if (isGitHubActions) {
		const document = documentFactory()
		const outputPath = resolve(__dirname, '../../html/api/openapi.json')
		mkdirSync(dirname(outputPath), { recursive: true })
		writeFileSync(outputPath, JSON.stringify(document, null, 2), { encoding: 'utf-8' })
	}
}
