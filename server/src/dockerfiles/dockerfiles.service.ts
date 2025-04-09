import { Injectable } from '@nestjs/common'
import { CreateDockerfileResponseDto } from './dto/create-dockerfile.response.dto'
import { FindDockerfileResponseDto } from './dto/find-dockerfile.response.dto'
import { DockerfileStatusResponseDto } from './dto/dockerfile-status.response.dto'
import { DockerfileStatus } from './constants/dockerfile-status.enum'

@Injectable()
export class DockerfilesService {
	create(): CreateDockerfileResponseDto {
		const id = '1'
		return { id, status: DockerfileStatus.Pending }
	}

	findAll(): FindDockerfileResponseDto[] {
		return [{ id: '1', status: DockerfileStatus.Pending }]
	}

	findOne(id: string): FindDockerfileResponseDto {
		return { id, status: DockerfileStatus.Pending }
	}

	getStatus(id: string): DockerfileStatusResponseDto {
		return { id, status: DockerfileStatus.Pending }
	}
}
