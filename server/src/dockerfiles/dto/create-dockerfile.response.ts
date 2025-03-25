import { ApiProperty } from '@nestjs/swagger'

export class CreateDockerfileResponseDto {
	@ApiProperty()
	id: string

	@ApiProperty({ enum: ['pending'] })
	status: 'pending'
}
