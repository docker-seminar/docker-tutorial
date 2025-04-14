import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DockerfilesModule } from './dockerfiles/dockerfiles.module'
import { ConfigModule } from '@nestjs/config'

@Module({
	imports: [
		ConfigModule.forRoot({
			ignoreEnvFile: true,
		}),
		DockerfilesModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
