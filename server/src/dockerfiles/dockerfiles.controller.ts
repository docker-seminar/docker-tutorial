import { Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common'
import { Response } from 'express'

@Controller('dockerfiles')
export class DockerfilesController {
	@Post()
	@HttpCode(HttpStatus.ACCEPTED)
	create(@Res({ passthrough: true }) res: Response) {
		const id = '1'

		res.setHeader('Location', `/dockerfiles/${id}/status`)
		return { id, status: 'pending' }
	}
}
