import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export function setupSwagger(app: INestApplication) {
	const documentBuilderConfig = new DocumentBuilder()
		.setTitle('Docker Tutorial')
		.setDescription('The Docker Tutorial API description.')
		.setContact('SeungBin Kim', 'https://github.com/docker-seminar/docker-tutorial', 'luxorienskim@gmail.com')
		// Todo: Use environment variable to set version dynamically
		.setVersion('0.0.0')
		.build()

	const documentFactory = () =>
		SwaggerModule.createDocument(app, documentBuilderConfig, {
			autoTagControllers: true,
		})
	SwaggerModule.setup('api', app, documentFactory)
}
