#!/bin/bash

# Get the current Git branch name (this will be used as the environment name)
BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)  # Use double quotes to execute the command
ENVIRONMENT=$BRANCH_NAME  # Set the environment to the current branch name

# Ensure GitHub CLI is authenticated
if ! gh auth status >/dev/null 2>&1; then
  echo "GitHub CLI is not authenticated. Please run 'gh auth login' and try again."
  exit 1
fi

# Get current repo name
REPO_NAME=$(gh repo view --json nameWithOwner --jq .nameWithOwner)

# Check if .env exists
if [[ ! -f .env ]]; then
  echo ".env file not found."
  exit 1
fi

# Check if the environment exists in GitHub
echo "Checking if environment '$ENVIRONMENT' exists in repository $REPO_NAME..."
ENV_EXISTS=$(gh api repos/$REPO_NAME/environments --jq ".environments[].name" | grep -x "$ENVIRONMENT")

# Create environment if it doesn't exist by setting a secret
if [[ -z "$ENV_EXISTS" ]]; then
  echo "Environment '$ENVIRONMENT' does NOT exist. Creating environment..."
  exit 1
fi

# Start uploading secrets into the '$ENVIRONMENT' environment
while IFS='=' read -r KEY VALUE || [[ -n "$KEY" ]]; do
  # Trim whitespace
  KEY=$(echo "$KEY" | xargs)
  VALUE=$(echo "$VALUE" | xargs)

  # Skip comments and empty lines
  [[ "$KEY" =~ ^#.*$ || -z "$KEY" ]] && continue

  echo "$VALUE" | gh secret set "$KEY" \
    --repo "$REPO_NAME" \
    --env "$ENVIRONMENT" \
    --body -
done < .env

# Update local .env file (optional, modify this based on what exactly you need)
echo "All applicable secrets have been uploaded to the '$ENVIRONMENT' environment."
