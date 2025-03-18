# Contributing

Thank you for your interest in contributing!
Please follow these guidelines to ensure a smooth contribution process.

# Guidelines

## Commits

### Commit Message

- Use the following commit message structure: `<type>(<scope>): <description>`
    - Allowed commit types: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `style`, `perf`, `revert`, and `infra`.
    - If new commit types are required, create an issue requesting it.
- Follow a structured commit message format:
    ```text
    feat(Config): Add support for dynamic environment variable loading
    infra(CD): Implement CodeDeploy Blue/Green deployment
    docs(CONTRIBUTING): Add Pull Request section
    ```
- Use meaningful messages. Avoid generic commit messages like "Update code" or "Fix bug."
- **It is generally better to avoid repeating information already included in the commit metadata.** For example,
  mentioning file names in commit messages is usually unnecessary since Git already tracks this information, but there
  may be cases where it adds clarity.
- Commit messages should be written in **imperative mood** (e.g., "Prevent connection timeout" instead of "Prevented
  connection timeout").

### Git Hooks

This repository uses Git hooks to enforce commit message conventions and other checks.
You must enable them manually before contributing.
For setup instructions, refer to [README.md](../infra/git/hooks/README.md).

## Pull Request

- Create **small and focused PRs** to keep the review process efficient.
- PR title should follow the same structure as the commit message format.
- Link to any related issues in the PR description.
- Ensure the build and tests pass before requesting a review.

## Code Style & Linting

[//]: # (TODO: TBD)

## Testing

[//]: # (TODO: TBD)

## Security Considerations

- Do not expose sensitive information in commits.
- Avoid using hardcoded credentials, API keys, or secrets.
- If you identify a security vulnerability, report it privately instead of opening an issue.

## Documentation Updates

- If your change affects usage, update `README.md` or any relevant documentation.
- Ensure all example commands and descriptions are up to date.


