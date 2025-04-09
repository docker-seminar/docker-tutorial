import { Test, TestingModule } from '@nestjs/testing'
import { DockerfilesController } from './dockerfiles.controller'
import { DockerfilesService } from './dockerfiles.service'
import { DockerfileStatus } from './constants/dockerfile-status.enum'
import { Response } from 'express'

describe('DockerfilesController', () => {
	let controller: DockerfilesController
	let service: DockerfilesService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [DockerfilesController],
			providers: [
				{
					provide: DockerfilesService,
					useValue: {
						create: vi.fn(),
						findAll: vi.fn(),
						findOne: vi.fn(),
						getStatus: vi.fn(),
					},
				},
			],
		}).compile()

		controller = module.get<DockerfilesController>(DockerfilesController)
		service = module.get<DockerfilesService>(DockerfilesService)
	})

	describe('create', () => {
		it('should return a Dockerfile creation result with id and set Location header', () => {
			const setHeader = vi.fn()
			const res = { setHeader } as unknown as Response
			const mockResult = { id: '1', status: DockerfileStatus.Pending }

			vi.spyOn(service, 'create').mockReturnValue(mockResult)

			const result = controller.create(res)

			expect(result).toEqual(mockResult)
			expect(service.create).toHaveBeenCalled()
			expect(setHeader).toHaveBeenCalledWith('Location', '/dockerfiles/1/status')
		})
	})

	describe('findAll', () => {
		it('should return an array of one Dockerfile having id and status', () => {
			const mockResult = [{ id: '1', status: DockerfileStatus.Pending }]

			vi.spyOn(service, 'findAll').mockReturnValue(mockResult)

			const result = controller.findAll()

			expect(result).toEqual(mockResult)
			expect(service.findAll).toHaveBeenCalled()
		})
	})

	describe('findOne', () => {
		it('should return a Dockerfile with matching id and pending status', () => {
			const id = 'abc123'
			const mockResult = { id, status: DockerfileStatus.Pending }

			vi.spyOn(service, 'findOne').mockReturnValue(mockResult)

			const result = controller.findOne(id)

			expect(result).toEqual(mockResult)
			expect(service.findOne).toHaveBeenCalledWith(id)
		})
	})

	describe('getStatus', () => {
		it('should return Dockerfile status by id', () => {
			const id = 'xyz789'
			const mockResult = { id, status: DockerfileStatus.Pending }

			vi.spyOn(service, 'getStatus').mockReturnValue(mockResult)

			const result = controller.getStatus(id)

			expect(result).toEqual(mockResult)
			expect(service.getStatus).toHaveBeenCalledWith(id)
		})
	})
})
