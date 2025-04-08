// noinspection JSIgnoredPromiseFromCall

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { setupSwagger } from './swagger/swagger.config'

/**
 * Bootstraps the NestJS application.
 *
 * This function initializes the app, sets up Swagger API documentation,
 * and starts listening on the configured port (default: 3000).
 *
 * @example
 * // Entry point for the application
 * bootstrap()
 * 	.then(() => console.log('App is running')
 * 	.catch(err => console.error(err))
 */
async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	await setupSwagger(app)
	await app.listen(process.env.PORT ?? 3000)
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
