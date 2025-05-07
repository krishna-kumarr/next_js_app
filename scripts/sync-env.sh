#!/bin/bash

# Get the current Git branch name (this will be used as the environment name)
BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)
ENVIRONMENT=$BRANCH_NAME

# Ensure GitHub CLI is authenticated
if ! gh auth status >/dev/null 2>&1; then
  echo "❌ GitHub CLI is not authenticated. Please run 'gh auth login' and try again."
  exit 1
fi

# Get current repo name
REPO_NAME=$(gh repo view --json nameWithOwner --jq .nameWithOwner)

# Check if .env exists
if [[ ! -f .env ]]; then
  echo "❌ .env file not found."
  exit 1
fi

# Check if the environment exists in GitHub
echo "🔍 Checking if environment '$ENVIRONMENT' exists in repository $REPO_NAME..."
ENV_EXISTS=$(gh api repos/$REPO_NAME/environments --jq ".environments[].name" | grep -x "$ENVIRONMENT")

# Exit if the environment doesn't exist
if [[ -z "$ENV_EXISTS" ]]; then
  echo "❌ Environment '$ENVIRONMENT' does NOT exist. Stopping the process."
  exit 1
fi

# Display secrets already set in this environment
echo "📦 Fetching existing secrets for environment '$ENVIRONMENT'..."
gh api repos/$REPO_NAME/environments/$ENVIRONMENT/secrets \
  --jq '.secrets[].name' || echo "⚠️ No secrets found."
