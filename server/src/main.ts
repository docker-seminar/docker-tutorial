// noinspection JSIgnoredPromiseFromCall

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const documentBuilderConfig = new DocumentBuilder()
		.setTitle('Docker Tutorial')
		.setDescription('The Docker Tutorial API description.')
		.setContact('SeungBin Kim', 'https://github.com/docker-seminar/docker-tutorial', 'luxorienskim@gmail.com')
		.setOpenAPIVersion('3.1.1')
		// Todo: Use environment variable to set version dynamically
		.setVersion('0.0.0')
		.build()

	const documentFactory = () =>
		SwaggerModule.createDocument(app, documentBuilderConfig, {
			autoTagControllers: true,
		})
	SwaggerModule.setup('api', app, documentFactory)

	await app.listen(process.env.PORT ?? 3000)
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
