# Docker Tutorial Web Application

The **Docker Tutorial Web Application** is an interactive leawrning platform designed to teach users how to write and
execute Dockerfiles effectively.
This platform allows users to **write Dockerfiles, build images, and run containers in a real execution environment**.

By leveraging **Svelte for the frontend, NestJS for the API server, and Go with the Docker Engine API for execution**,
the application ensures an intuitive and responsive experience while maintaining security and efficiency.
The Go-based execution engine runs the submitted Dockerfiles inside a controlled Docker environment, verifying the
correctness of user-submitted configurations without requiring manual intervention.

With an interactive code editor, instant feedback, and secure sandboxed execution, this tutorial provides a hand-on
learning experience that bridges the gap between theory and practical application.

# Architecture

```mermaid
sequenceDiagram
    participant User
    participant Svelte (Frontend)
    participant NestJS (API Server)
    participant Go (Docker Runner)
    participant Docker Engine

    User->>Svelte (Frontend): Writes a Dockerfile in editor
    Svelte (Frontend)->>NestJS (API Server): Submits Dockerfile via API
    NestJS (API Server)->>Go (Docker Runner): Sends Dockerfile for execution
    Go (Docker Runner)->>Docker Engine: Builds and runs the Dockerfile
    Docker Engine-->>Go (Docker Runner): Returns build and run output
    Go (Docker Runner)-->>NestJS (API Server): Sends validation result
    NestJS (API Server)-->>Svelte (Frontend): Returns result (success/fail)
    Svelte (Frontend)-->>User: Displays output and feedback
```

# References

- https://github.com/ory/dockertest