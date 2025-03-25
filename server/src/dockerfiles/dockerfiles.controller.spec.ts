import { Test, TestingModule } from '@nestjs/testing'
import { DockerfilesController } from './dockerfiles.controller'
import { DockerfileStatus } from './constants/dockerfile-status.enum'
import { Response } from 'express'

describe('DockerfilesController', () => {
	let controller: DockerfilesController

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [DockerfilesController],
		}).compile()

		controller = module.get<DockerfilesController>(DockerfilesController)
	})

	describe('create', () => {
		it('should return a Dockerfile creation result with id and set Location header', () => {
			const setHeader = vi.fn()
			const res = { setHeader } as unknown as Response

			const result = controller.create(res)

			expect(result).toEqual({ id: '1', status: DockerfileStatus.Pending })
			expect(setHeader).toHaveBeenCalledWith('Location', '/dockerfiles/1/status')
		})
	})

	describe('findAll', () => {
		it('should return an array of one Dockerfile having id and status', () => {
			const result = controller.findAll()

			expect(Array.isArray(result)).toBeTruthy()
			expect(result).toHaveLength(1)
			expect(result[0]).toEqual({ id: '1', status: DockerfileStatus.Pending })
		})
	})

	describe('findOne', () => {
		it('should return a Dockerfile with matching id and pending status', () => {
			const id = 'abc123'
			const result = controller.findOne(id)

			expect(result).toEqual({ id, status: DockerfileStatus.Pending })
		})
	})

	describe('getStatus', () => {
		it('should return Dockerfile status by id', () => {
			const id = 'xyz789'
			const result = controller.getStatus(id)

			expect(result).toEqual({ id, status: DockerfileStatus.Pending })
		})
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})
})
