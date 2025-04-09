import { Test, TestingModule } from '@nestjs/testing'
import { DockerfilesService } from './dockerfiles.service'
import { DockerfileStatus } from './constants/dockerfile-status.enum'

describe('DockerfilesService', () => {
	let service: DockerfilesService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [DockerfilesService],
		}).compile()

		service = module.get<DockerfilesService>(DockerfilesService)
	})

	describe('create', () => {
		it('should return a Dockerfile creation result with id and pending status', () => {
			const result = service.create()

			expect(result).toEqual({ id: '1', status: DockerfileStatus.Pending })
		})
	})

	describe('findAll', () => {
		it('should return an array of Dockerfiles', () => {
			const result = service.findAll()

			expect(Array.isArray(result)).toBeTruthy()
			expect(result).toHaveLength(1)
			expect(result[0]).toEqual({ id: '1', status: DockerfileStatus.Pending })
		})
	})

	describe('findOne', () => {
		it('should return a Dockerfile with the specified id', () => {
			const id = 'abc123'
			const result = service.findOne(id)

			expect(result).toEqual({ id, status: DockerfileStatus.Pending })
		})
	})

	describe('getStatus', () => {
		it('should return the status of a Dockerfile with the specified id', () => {
			const id = 'xyz789'
			const result = service.getStatus(id)

			expect(result).toEqual({ id, status: DockerfileStatus.Pending })
		})
	})
})
