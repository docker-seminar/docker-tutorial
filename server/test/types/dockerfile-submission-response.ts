import { DockerfileStatus } from '../../src/dockerfiles/constants/dockerfile-status.enum'

export interface DockerfileSubmissionResponse {
	id: string
	status: DockerfileStatus
}
