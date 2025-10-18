# Mahi EAS Workflow Guide

## 🚀 Complete TestFlight & Production Workflow

### Prerequisites
1. **EAS CLI installed**: `pnpm add -g eas-cli`
2. **Login to Expo**: `eas login`
3. **Apple Developer Account** (for TestFlight/App Store)
4. **App Store Connect** app created

### Setup Steps

#### 1. Configure Apple Credentials
Update `eas.json` with your Apple details:
```json
{
  "submit": {
    "testflight": {
      "ios": {
        "appleId": "your-apple-id@example.com",
        "ascAppId": "your-app-store-connect-app-id",
        "appleTeamId": "your-apple-team-id"
      }
    }
  }
}
```

#### 2. Get Your Apple IDs
- **Apple ID**: Your Apple Developer account email
- **ASC App ID**: Found in App Store Connect → Your App → App Information
- **Team ID**: Found in Apple Developer → Membership

## 📱 Workflow Commands

### Development Phase
```bash
# Start development
pnpm start

# Build for development testing
pnpm run build:dev

# Push updates during development
pnpm run update:dev
```

### TestFlight Phase
```bash
# Build and submit to TestFlight (first time)
pnpm run deploy:testflight

# Push updates to TestFlight users
pnpm run update:testflight
```

### Production Phase
```bash
# Build and submit to App Store
pnpm run deploy:production

# Push updates to production users
pnpm run update:production
```

## 🎯 Complete Workflow

### Phase 1: Initial TestFlight Setup
1. **Configure Apple credentials** in `eas.json`
2. **Build for TestFlight**: `pnpm run deploy:testflight`
3. **Add testers** in App Store Connect
4. **Test your app** with beta users

### Phase 2: Iterative Development
1. **Make changes** to your Mahi app
2. **Push updates**: `pnpm run update:testflight`
3. **Get feedback** from TestFlight users
4. **Repeat** until ready for production

### Phase 3: Production Release
1. **Final build**: `pnpm run deploy:production`
2. **Submit for review** (automatic via EAS)
3. **Release to App Store** when approved
4. **Push updates**: `pnpm run update:production`

## 💰 Cost Optimization

### Free Tier Usage (2025)
- **30 builds per month**: Free (across all profiles)
- **Unlimited updates**: Always free
- **Fast-failed builds**: Not counted (fails within 3 minutes)
- **Total cost**: $0 for most development work

### Smart Strategy
- Build once for TestFlight
- Use updates for all iterations
- Build once for production
- Use updates for maintenance

## 🔧 Troubleshooting

### Common Issues
1. **Apple credentials**: Make sure all IDs are correct
2. **Build failures**: Check `eas.json` configuration
3. **Update not working**: Verify channel names match

### Useful Commands
```bash
# Check project status
eas project:info

# View build logs
eas build:list

# Check update status
eas update:list
```

## 📊 Monitoring

### EAS Dashboard
- View builds and updates
- Monitor usage and costs
- Check error logs

### App Store Connect
- Manage TestFlight testers
- Monitor app performance
- Handle App Store submissions

---

**Remember**: Most of your development work will be updates (free), not builds. Only build when you add native dependencies or submit to stores!

