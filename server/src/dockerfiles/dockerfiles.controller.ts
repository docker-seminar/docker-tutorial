import { Controller, Get, HttpCode, HttpStatus, Param, Post, Res } from '@nestjs/common'
import { ApiAcceptedResponse, ApiOkResponse } from '@nestjs/swagger'
import { CreateDockerfileResponseDto } from './dto/create-dockerfile.response.dto'
import { Response } from 'express'
import { DockerfileStatus } from './constants/dockerfile-status.enum'
import { FindDockerfileResponseDto } from './dto/find-dockerfile.response.dto'
import { DockerfileStatusResponseDto } from './dto/dockerfile-status.response.dto'

@Controller('dockerfiles')
export class DockerfilesController {
	@Post()
	@HttpCode(HttpStatus.ACCEPTED)
	@ApiAcceptedResponse({
		type: CreateDockerfileResponseDto,
		headers: {
			Location: {
				description: 'URL to check the build status of the submitted Dockerfile',
				// Todo: Update example value when submission ID becomes UUID.
				schema: { type: 'string', format: 'uri', example: '/dockerfiles/1/status' },
			},
		},
	})
	create(@Res({ passthrough: true }) res: Response): CreateDockerfileResponseDto {
		const id = '1'

		res.setHeader('Location', `/dockerfiles/${id}/status`)
		return { id, status: DockerfileStatus.Pending }
	}

	@Get()
	@ApiOkResponse({
		type: FindDockerfileResponseDto,
	})
	findAll(): FindDockerfileResponseDto[] {
		return [{ id: '1', status: DockerfileStatus.Pending }]
	}

	@Get(':id')
	@ApiOkResponse({
		type: FindDockerfileResponseDto,
	})
	findOne(@Param('id') id: string): FindDockerfileResponseDto {
		return { id, status: DockerfileStatus.Pending }
	}

	@Get(':id/status')
	@ApiOkResponse({
		type: DockerfileStatusResponseDto,
	})
	getStatus(@Param('id') id: string): DockerfileStatusResponseDto {
		return { id, status: DockerfileStatus.Pending }
	}
}
