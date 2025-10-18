# 🚀 EAS Workflows for Mahi App

This directory contains EAS workflow files that automate your build and deployment processes.

## 📁 Available Workflows

### 1. `create-production-builds.yml`
**Purpose**: Creates production builds for both iOS and Android
**Usage**: When you're ready to submit to app stores
```bash
eas workflow:run create-production-builds
```

### 2. `create-testflight-builds.yml`
**Purpose**: Creates TestFlight builds for iOS beta testing
**Usage**: When you want to test with iOS beta users
```bash
eas workflow:run create-testflight-builds
```

### 3. `create-development-builds.yml`
**Purpose**: Creates development builds for testing
**Usage**: When you need to test new features internally
```bash
eas workflow:run create-development-builds
```

### 4. `push-updates.yml`
**Purpose**: Pushes updates to existing users
**Usage**: When you want to update users without rebuilding
```bash
eas workflow:run push-updates
```

### 5. `client-deployment.yml`
**Purpose**: Complete client deployment workflow
**Usage**: When you want to deploy to all client channels
```bash
eas workflow:run client-deployment
```

## 🎯 How to Use Workflows

### Running a Workflow
```bash
# Run a specific workflow
eas workflow:run <workflow-name>

# Example: Create production builds
eas workflow:run create-production-builds
```

### Monitoring Workflows
```bash
# List all workflows
eas workflow:list

# Check workflow status
eas workflow:status <workflow-id>
```

## 💡 Best Practices

### For Client Management
1. **Use `client-deployment.yml`** for regular client updates
2. **Use `create-testflight-builds.yml`** for iOS beta testing
3. **Use `push-updates.yml`** for quick fixes and improvements

### For Production Releases
1. **Use `create-production-builds.yml`** when ready for app stores
2. **Test thoroughly** with TestFlight first
3. **Monitor feedback** before production release

## 🔧 Customizing Workflows

You can modify any workflow file to suit your needs:

```yaml
name: Custom Workflow
jobs:
  custom_job:
    type: build
    params:
      platform: ios
      profile: testflight
      # Add custom parameters here
```

## 📊 Workflow Benefits

- **Automation**: No need to remember complex commands
- **Consistency**: Same process every time
- **Client Management**: Easy deployment to different client groups
- **Time Saving**: One command does multiple operations
- **Error Reduction**: Less chance of mistakes

## 🚨 Troubleshooting

### Common Issues
1. **Workflow not found**: Check the workflow name and file location
2. **Build failures**: Check your `eas.json` configuration
3. **Permission errors**: Ensure you're logged into EAS

### Getting Help
```bash
# Check workflow status
eas workflow:status

# View workflow logs
eas workflow:logs <workflow-id>

# List available workflows
eas workflow:list
```

---

**Remember**: Workflows are just automated versions of the commands you'd run manually. They make client management much easier!
