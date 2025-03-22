// noinspection JSIgnoredPromiseFromCall

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { setupSwagger } from './swagger/swagger.config'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	setupSwagger(app)
	await app.listen(process.env.PORT ?? 3000)
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
