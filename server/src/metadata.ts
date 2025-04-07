/* eslint-disable */
export default async () => {
    const t = {
        ["./dockerfiles/constants/dockerfile-status.enum"]: await import("./dockerfiles/constants/dockerfile-status.enum"),
        ["./dockerfiles/dto/create-dockerfile.response.dto"]: await import("./dockerfiles/dto/create-dockerfile.response.dto"),
        ["./dockerfiles/dto/find-dockerfile.response.dto"]: await import("./dockerfiles/dto/find-dockerfile.response.dto"),
        ["./dockerfiles/dto/dockerfile-status.response.dto"]: await import("./dockerfiles/dto/dockerfile-status.response.dto")
    };
    return { "@nestjs/swagger": { "models": [[import("./dockerfiles/dto/dockerfile-base.response.dto"), { "DockerfileBaseResponseDto": { id: { required: true, type: () => String }, status: { required: true, type: () => String, description: "Current processing state of the Dockerfile.", enum: t["./dockerfiles/constants/dockerfile-status.enum"].DockerfileStatus } } }], [import("./dockerfiles/dto/create-dockerfile.response.dto"), { "CreateDockerfileResponseDto": {} }], [import("./dockerfiles/dto/find-dockerfile.response.dto"), { "FindDockerfileResponseDto": {} }], [import("./dockerfiles/dto/dockerfile-status.response.dto"), { "DockerfileStatusResponseDto": {} }]], "controllers": [[import("./app.controller"), { "AppController": { "getHello": { type: String } } }], [import("./dockerfiles/dockerfiles.controller"), { "DockerfilesController": { "create": { type: t["./dockerfiles/dto/create-dockerfile.response.dto"].CreateDockerfileResponseDto }, "findAll": { type: [t["./dockerfiles/dto/find-dockerfile.response.dto"].FindDockerfileResponseDto] }, "findOne": { type: t["./dockerfiles/dto/find-dockerfile.response.dto"].FindDockerfileResponseDto }, "getStatus": { type: t["./dockerfiles/dto/dockerfile-status.response.dto"].DockerfileStatusResponseDto } } }]] } };
};