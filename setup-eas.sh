#!/bin/bash

# 🚀 Mahi App - EAS Setup Script
# This script helps you get started with EAS for client distribution

echo "🚀 Setting up EAS for Mahi App..."

# Check if EAS CLI is installed
if ! command -v eas &> /dev/null; then
    echo "📦 Installing EAS CLI..."
    pnpm add -g eas-cli
else
    echo "✅ EAS CLI already installed"
fi

# Check if user is logged in
echo "🔐 Checking EAS login status..."
if eas whoami &> /dev/null; then
    echo "✅ Already logged into EAS"
    eas whoami
else
    echo "🔑 Please log into EAS..."
    eas login
fi

# Check project status
echo "📊 Checking project status..."
eas project:info

echo ""
echo "🎯 Next steps:"
echo "1. Update your Apple credentials in eas.json"
echo "2. Run 'pnpm run deploy:testflight' to build for TestFlight"
echo "3. Add testers in App Store Connect"
echo "4. Send CLIENT_WORKFLOW_GUIDE.md to your clients"
echo ""
echo "📚 Available commands:"
echo "  pnpm run build:testflight    # Build for TestFlight"
echo "  pnpm run update:testflight   # Push updates to TestFlight users"
echo "  pnpm run deploy:production  # Build and submit to App Store"
echo "  pnpm run update:production   # Push updates to production users"
echo ""
echo "📖 Read DEVELOPER_WORKFLOW_GUIDE.md for detailed instructions"
