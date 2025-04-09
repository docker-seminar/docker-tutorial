import { Module } from '@nestjs/common'
import { DockerfilesController } from './dockerfiles.controller'
import { DockerfilesService } from './dockerfiles.service'

@Module({
	controllers: [DockerfilesController],
	providers: [DockerfilesService],
})
export class DockerfilesModule {}
