#!/usr/bin/env bash
set -e
echo "🔍 Running gitsnap-cli health check..."
npm test
npm link --silent
echo "✨ Ready! Run: gitsnap --diff"
