import { Test, TestingModule } from '@nestjs/testing'
import { DockerfilesController } from './dockerfiles.controller'

describe('DockerfilesController', () => {
	let controller: DockerfilesController

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [DockerfilesController],
		}).compile()

		controller = module.get<DockerfilesController>(DockerfilesController)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})
})
