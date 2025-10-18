# 🛠️ Mahi App - Developer Workflow Guide

## 🔐 **EAS Login & Setup**

### 1. Install and Login to EAS
```bash
# Install EAS CLI globally
pnpm add -g eas-cli

# Login to your Expo account
eas login

# Verify login
eas whoami

# Check project status
eas project:info
```

### 2. Configure Apple Credentials
Update your `eas.json` with real Apple Developer details:

```json
{
  "submit": {
    "testflight": {
      "ios": {
        "appleId": "your-actual-apple-id@example.com",
        "ascAppId": "your-actual-app-store-connect-app-id",
        "appleTeamId": "your-actual-apple-team-id"
      }
    },
    "production": {
      "ios": {
        "appleId": "your-actual-apple-id@example.com",
        "ascAppId": "your-actual-app-store-connect-app-id",
        "appleTeamId": "your-actual-apple-team-id"
      }
    }
  }
}
```

## 📱 **Client Distribution Workflows**

### **Workflow 1: Initial TestFlight Setup**
```bash
# 1. Build and submit to TestFlight (first time)
pnpm run deploy:testflight

# 2. Add testers in App Store Connect
# 3. Send invitations to clients
# 4. Monitor feedback and usage
```

### **Workflow 2: Development Updates**
```bash
# 1. Make code changes
# 2. Push updates to TestFlight users
pnpm run update:testflight

# 3. Clients get instant updates
# 4. Collect feedback and iterate
```

### **Workflow 3: Production Release**
```bash
# 1. Final production build
pnpm run deploy:production

# 2. Submit to App Store
# 3. Release to public
# 4. Push updates to production users
pnpm run update:production
```

## 🎯 **Client Management Strategies**

### **Strategy 1: Staged Rollout**
```bash
# Phase 1: Internal testing
pnpm run update:development

# Phase 2: Beta testing
pnpm run update:testflight

# Phase 3: Production
pnpm run update:production
```

### **Strategy 2: Feature Flags**
```bash
# Use different channels for different client groups
eas update --branch "client-alpha" --message "New feature for alpha testers"
eas update --branch "client-beta" --message "Stable version for beta testers"
eas update --branch "production" --message "Public release"
```

### **Strategy 3: Client-Specific Builds**
```bash
# Create client-specific builds
eas build --profile testflight --platform ios --non-interactive
```

## 📊 **Monitoring Client Usage**

### **EAS Dashboard Monitoring**
```bash
# Check build status
eas build:list

# Monitor updates
eas update:list

# View project analytics
eas project:info
```

### **Client Feedback Collection**
1. **TestFlight Feedback**: Automatic collection via Apple
2. **In-App Analytics**: Track usage patterns
3. **Crash Reports**: Monitor stability
4. **User Surveys**: Collect structured feedback

## 🔧 **Advanced Client Workflows**

### **Workflow A: Multi-Client Testing**
```bash
# Create separate channels for different clients
eas update --branch "client-a" --message "Update for Client A"
eas update --branch "client-b" --message "Update for Client B"
eas update --branch "client-c" --message "Update for Client C"
```

### **Workflow B: Gradual Rollout**
```bash
# 1. Deploy to 10% of users
eas update --branch "production" --message "Gradual rollout - 10%"

# 2. Monitor metrics
# 3. Increase to 50% if stable
eas update --branch "production" --message "Gradual rollout - 50%"

# 4. Full rollout if successful
eas update --branch "production" --message "Full rollout"
```

### **Workflow C: A/B Testing**
```bash
# Deploy variant A
eas update --branch "variant-a" --message "A/B Test - Variant A"

# Deploy variant B
eas update --branch "variant-b" --message "A/B Test - Variant B"

# Analyze results and deploy winner
eas update --branch "production" --message "A/B Test Winner Deployed"
```

## 📈 **Client Communication**

### **Automated Notifications**
```bash
# Send update notifications to clients
eas update --branch "testflight" --message "New features available - check your TestFlight app"
```

### **Client Status Updates**
```bash
# Check which clients have latest version
eas update:list --branch testflight

# Monitor client adoption
eas project:info
```

## 🚨 **Troubleshooting Client Issues**

### **Common Client Problems**
1. **App won't install**: Check device compatibility
2. **Updates not working**: Verify channel configuration
3. **Login issues**: Check authentication setup
4. **Performance problems**: Monitor build optimization

### **Debug Commands**
```bash
# Check client update status
eas update:list --branch testflight

# View build logs
eas build:list

# Check project configuration
eas project:info
```

## 💰 **Cost Management**

### **Free Tier Optimization (2025)**
- **30 builds per month**: Free (across all profiles)
- **Unlimited updates**: Always free
- **Fast-failed builds**: Not counted (fails within 3 minutes)
- **Total cost**: $0 for most development work

### **Smart Update Strategy**
```bash
# Use updates for 90% of client work
pnpm run update:testflight  # Free
pnpm run update:production  # Free

# Build when needed (30 free builds per month)
pnpm run build:testflight   # When adding native dependencies or major changes
pnpm run build:production   # For App Store submission
```

## 📱 **Client Onboarding Process**

### **Step 1: Send Invitations**
1. Build TestFlight version
2. Add client emails to TestFlight
3. Send onboarding instructions
4. Provide CLIENT_WORKFLOW_GUIDE.md

### **Step 2: Monitor Adoption**
1. Track installation rates
2. Monitor usage patterns
3. Collect feedback
4. Iterate based on data

### **Step 3: Maintain Engagement**
1. Regular update communications
2. Feature announcements
3. Bug fix notifications
4. Performance improvements

---

## 🎯 **Quick Reference Commands**

### **Daily Development**
```bash
pnpm start                    # Start development server
pnpm run update:testflight    # Push updates to beta testers
```

### **Weekly Releases**
```bash
pnpm run deploy:testflight    # Build and submit to TestFlight
pnpm run update:testflight    # Push updates to clients
```

### **Monthly Production**
```bash
pnpm run deploy:production    # Build and submit to App Store
pnpm run update:production   # Push updates to all users
```

### **Monitoring**
```bash
eas build:list               # Check build status
eas update:list             # Check update status
eas project:info            # Check project health
```

---

**Remember**: Most of your client work will be updates (free), not builds. Only build when you add native dependencies or submit to stores!
