import { Module } from '@nestjs/common'
import { DockerfilesController } from './dockerfiles.controller'

@Module({
	controllers: [DockerfilesController],
})
export class DockerfilesModule {}
