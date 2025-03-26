import { ApiProperty } from '@nestjs/swagger'
import { DockerfileStatus } from '../constants/dockerfile-status.enum'

export class CreateDockerfileResponseDto {
	@ApiProperty({
		format: 'uuid',
		description: 'Unique identifier for the submitted Dockerfile, generated using Node.js crypto.randomUUID().',
		minLength: 36,
		maxLength: 36,
	})
	id: string

	@ApiProperty({
		type: 'string',
		enum: DockerfileStatus,
		enumName: 'DockerfileStatus',
		description: 'Current processing state of the Dockerfile.',
	})
	status: DockerfileStatus
}
