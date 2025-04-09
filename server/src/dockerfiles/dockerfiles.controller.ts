import { Controller, Get, HttpCode, HttpStatus, Param, Post, Res } from '@nestjs/common'
import { ApiAcceptedResponse, ApiOkResponse } from '@nestjs/swagger'
import { CreateDockerfileResponseDto } from './dto/create-dockerfile.response.dto'
import { Response } from 'express'
import { FindDockerfileResponseDto } from './dto/find-dockerfile.response.dto'
import { DockerfileStatusResponseDto } from './dto/dockerfile-status.response.dto'
import { DockerfilesService } from './dockerfiles.service'

@Controller('dockerfiles')
export class DockerfilesController {
	constructor(private readonly dockerfilesService: DockerfilesService) {}

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
		const result = this.dockerfilesService.create()

		res.setHeader('Location', `/dockerfiles/${result.id}/status`)
		return result
	}

	@Get()
	@ApiOkResponse({
		type: FindDockerfileResponseDto,
	})
	findAll(): FindDockerfileResponseDto[] {
		return this.dockerfilesService.findAll()
	}

	@Get(':id')
	@ApiOkResponse({
		type: FindDockerfileResponseDto,
	})
	findOne(@Param('id') id: string): FindDockerfileResponseDto {
		return this.dockerfilesService.findOne(id)
	}

	@Get(':id/status')
	@ApiOkResponse({
		type: DockerfileStatusResponseDto,
	})
	getStatus(@Param('id') id: string): DockerfileStatusResponseDto {
		return this.dockerfilesService.getStatus(id)
	}
}
