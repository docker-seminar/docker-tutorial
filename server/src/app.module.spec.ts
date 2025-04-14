import { Test } from '@nestjs/testing'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'

describe('AppModule with ConfigModule', () => {
	it('should load NODE_ENV from process.env', async () => {
		process.env.NODE_ENV = 'test'

		const moduleRef = await Test.createTestingModule({
			imports: [AppModule],
		}).compile()

		const configService = moduleRef.get(ConfigService)

		expect(configService.get('NODE_ENV')).toBe('test')
	})
})
