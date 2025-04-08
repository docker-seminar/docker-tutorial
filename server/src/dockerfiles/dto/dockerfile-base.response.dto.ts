import { DockerfileStatus } from '../constants/dockerfile-status.enum'
import { ApiProperty } from '@nestjs/swagger'

export abstract class DockerfileBaseResponseDto {
	@ApiProperty({
		format: 'uuid',
		minLength: 36,
		maxLength: 36,
	})
	/**
	 * Unique identifier for the submitted Dockerfile, generated using Node.js crypto.randomUUID().
	 */
	id: string

	/**
	 * Current processing state of the Dockerfile.
	 */
	status: DockerfileStatus
}
