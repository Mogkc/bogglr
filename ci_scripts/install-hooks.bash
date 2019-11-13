#!/usr/bin/env bash

GIT_DIR=$(git rev-parse --git-dir)

echo "Activating hooks..."

# This links our 'pre-commit.bash' to git's commit action
ln -s ../pre-commit.bash $GIT_DIR/hooks/pre-commit

echo "Hooks activated on this machine"
