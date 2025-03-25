import { Controller, Get, HttpCode, HttpStatus, Post, Res } from '@nestjs/common'
import { ApiAcceptedResponse } from '@nestjs/swagger'
import { CreateDockerfileResponseDto } from './dto/create-dockerfile.response'
import { Response } from 'express'
import { DockerfileStatus } from './constants/dockerfile-status.enum'

@Controller('dockerfiles')
export class DockerfilesController {
	@Post()
	@HttpCode(HttpStatus.ACCEPTED)
	@ApiAcceptedResponse({ type: CreateDockerfileResponseDto })
	create(@Res({ passthrough: true }) res: Response): CreateDockerfileResponseDto {
		const id = '1'

		res.setHeader('Location', `/dockerfiles/${id}/status`)
		return { id, status: DockerfileStatus.Pending }
	}

	@Get()
	findAll(): FindDockerfileResponseDto[] {
		return [{ id: '1', status: DockerfileStatus.Pending }]
	}
}
