import { INestApplication } from '@nestjs/common'
import { App } from 'supertest/types'
import { Test, TestingModule } from '@nestjs/testing'
import { describe } from 'vitest'
import request from 'supertest'
import { DockerfilesModule } from '../src/dockerfiles/dockerfiles.module'
import { DockerfileStatus } from '../src/dockerfiles/constants/dockerfile-status.enum'
import { DockerfileSubmissionResponse } from './types/dockerfile-submission-response'

describe('Dockerfile API (E2E)', () => {
	let app: INestApplication<App>

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
		let dockerfileId: string

		beforeAll(async () => {
			const res = await request(app.getHttpServer())
				.post('/dockerfiles')
				.send({ content: 'FROM alpine\nRUN echo hello' })
				.expect(202)

			const body = res.body as DockerfileSubmissionResponse
			dockerfileId = body.id
		})
		it('should return a Dockerfile result', async () => {
			const res = await request(app.getHttpServer()).get(`/dockerfiles/${dockerfileId}`).expect(200)
			const { status } = res.body as DockerfileSubmissionResponse
			expect(res.body).toHaveProperty('id', dockerfileId)
			expect(res.body).toHaveProperty('status')
			expect(typeof status).toBe('string')
		})
	})

	describe('GET /dockerfiles/:id/status', () => {
		let dockerfileId: string

		beforeAll(async () => {
			const res = await request(app.getHttpServer())
				.post('/dockerfiles')
				.send({ content: 'FROM alpine\nRUN echo hello' })
				.expect(202)

			const body = res.body as DockerfileSubmissionResponse
			dockerfileId = body.id
		})

		it('should return the build status', async () => {
			const res = await request(app.getHttpServer()).get(`/dockerfiles/${dockerfileId}/status`).expect(200)

			const { status } = res.body as DockerfileSubmissionResponse
			expect(res.body).toHaveProperty('id', dockerfileId)
			expect(typeof status).toBe('string')
			expect(Object.values(DockerfileStatus)).toContain(status)
		})
	})

	describe('GET /dockerfiles', () => {
		it('should return list of submissions', async () => {
			const res = await request(app.getHttpServer()).get('/dockerfiles').expect(200)

			expect(Array.isArray(res.body)).toBeTruthy()

			// Array of complete attempts by a user to send a Dockerfile to the server for building or validation.
			const submissions = res.body as Array<{ id: string; status: string }>

			submissions.forEach(item => {
				expect(item).toHaveProperty('id')
				expect(item).toHaveProperty('status')
				expect(typeof item.id).toBe('string')
				expect(Object.values(DockerfileStatus)).toContain(item.status)
			})
		})
	})
})
