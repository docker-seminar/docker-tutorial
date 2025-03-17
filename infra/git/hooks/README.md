# Why My Hooks Are Located in `/infra/git/hooks/`

By default, Git hooks are stored in the `.git/hooks/` directory inside each repository.
However, since this directory is not tracked by Git, hooks are not shared across multiple users.
To ensure consistency and allow version control, my hooks are located in `/infra/git/hooks/`.
This setup allows everyone to use the same hooks without manually copying them.

# Setup

Before using the hooks included in this repository, you need to follow some setup instructions:

- Changing the Git hook directory to the specified location.
- Ensure the hooks are executable.
- (*Optional*) Enable Git Hook in JetBrains IDE.

## Changing the Git Hook Directory

You can change the location of Git hooks using the `core.hooksPath` configuration option.
This allows you to store hooks in a directory that can be version-controlled and shared across teams.

### Steps to set a Custom Hooks Directory[README.md](README.md)

1. Configure Git to use this directory:
   ```bash
   git config core.hooksPath ./infra/git/hooks
   ```
2. Ensure the hooks are executable:
   ```bash
   chmod +x ./infra/git/hooks/*
   ```
3. (Optional) Enable JetBrain's IDE's Git Hook feature.

### Why Git Hooks Need to Be Executable

Git hooks are essentially scripts that Git executes at different stages of the version control process.
However, for these scripts to run successfully, they must have executable permissions.
Without the proper permissions, Git will ignore the hooks, preventing them from executing as intended.

## Available Hooks

### commit-msg

This hook enforces commit message convention by:

- Extracting the issue number from branch names following the pattern `[category]/[issue_number]`.
- Automatically adding the issue number to commit messages if not already present.
- Skipping the check for branches that don't follow the naming convention.
