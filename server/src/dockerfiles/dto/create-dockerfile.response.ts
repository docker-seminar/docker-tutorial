import { ApiProperty } from '@nestjs/swagger'
import { DockerfileStatus } from '../constants/dockerfile-status.enum'

export class CreateDockerfileResponseDto {
	@ApiProperty()
	id: string

	@ApiProperty({ enum: DockerfileStatus, enumName: 'DockerfileStatus' })
	status: DockerfileStatus
}
