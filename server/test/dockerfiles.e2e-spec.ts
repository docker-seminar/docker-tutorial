import { INestApplication } from '@nestjs/common'
import { App } from 'supertest/types'
import { Test, TestingModule } from '@nestjs/testing'
import { describe } from 'vitest'
import request from 'supertest'
import { DockerfilesModule } from '../src/dockerfiles/dockerfiles.module'

describe('Dockerfile API (E2E)', () => {
	let app: INestApplication<App>
	let dockerfileId: string

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [DockerfilesModule],
		}).compile()

		app = moduleFixture.createNestApplication()
		await app.init()
	})

	afterAll(async () => {
		await app.close()
	})

	describe('POST /dockerfiles', () => {
		it('should submit a Dockerfile', async () => {
			const res = await request(app.getHttpServer())
				.post('/dockerfiles')
				.send({ content: 'FROM alpine\nRUN echo hello' })
				.expect(202)

			expect(res.body).toHaveProperty('id')
			expect(res.body).toHaveProperty('status')
			expect(res.headers).toHaveProperty('location')
			expect(res.headers.location).toMatch(new RegExp(`/dockerfiles/${res.body.id}/status`))
		})
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
