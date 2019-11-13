#!/usr/bin/env bash

echo "Running pre-commit hook"
npm test

# $? references the exit code of previous command
if [[ $? -ne 0 ]]; then
  echo "Check your tests, there's an error"
  exit 1
fi

exit 0

