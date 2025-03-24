import { INestApplication } from '@nestjs/common'
import { App } from 'supertest/types'
import { Test, TestingModule } from '@nestjs/testing'
import { describe } from 'vitest'

describe('Dockerfile API (E2E)', () => {
	let app: INestApplication<App>
	let dockerfileId: string

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [DockerfileModule],
		}).compile()

		app = moduleFixture.createNestApplication()
		await app.init()
	})

	afterAll(async () => {
		await app.close()
	})

	describe('POST /dockerfiles', () => {
		it.todo('should submit a Dockerfile')
	})

	describe('GET /dockerfiles/:id', () => {
		it.todo('should return a Dockerfile result')
	})

	describe('GET /dockerfiles/:id/status', () => {
		it.todo('should return the build status')
	})

	describe('GET /dockerfiles', () => {
		it.todo('should return list of submissions')
	})
})
