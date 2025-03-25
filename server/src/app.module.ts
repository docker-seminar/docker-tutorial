import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DockerfilesModule } from './dockerfiles/dockerfiles.module'

@Module({
	imports: [DockerfilesModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
