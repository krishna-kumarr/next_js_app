#!/bin/bash

set -e

# Get the current Git branch name
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

# Check if the environment exists
echo "🔍 Checking if environment '$ENVIRONMENT' exists in repository $REPO_NAME..."
ENV_EXISTS=$(gh api repos/$REPO_NAME/environments --jq ".environments[].name" | grep -x "$ENVIRONMENT")

if [[ -z "$ENV_EXISTS" ]]; then
  echo "❌ Environment '$ENVIRONMENT' does NOT exist. Stopping the process."
  exit 1
fi

echo "📦 Fetching existing secrets for environment '$ENVIRONMENT'..."
gh api repos/$REPO_NAME/environments/$ENVIRONMENT/secrets \
  --jq '.secrets[].name' || echo "⚠️ No secrets found."

# Read .env file and update secrets
echo "🔄 Updating secrets in environment '$ENVIRONMENT'..."
while IFS='=' read -r key value || [[ -n "$key" ]]; do
  # Skip empty lines or comments
  [[ -z "$key" || "$key" =~ ^# ]] && continue

  # Trim quotes from value
  value=$(echo "$value" | sed -e 's/^"//' -e 's/"$//')

  echo "🔐 Setting secret: $key"
  gh secret set "$key" \
    --env "$ENVIRONMENT" \
    --repo "$REPO_NAME" \
    --body "$value"
done < .env

echo "✅ All secrets have been updated for environment '$ENVIRONMENT'."