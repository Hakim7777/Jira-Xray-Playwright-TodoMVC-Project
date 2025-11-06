# Jenkins CI/CD Setup Guide

This document provides step-by-step instructions to integrate the Playwright TodoMVC project with Jenkins for automated testing and reporting.

## Prerequisites

- Jenkins instance running (http://localhost:8080/)
- GitHub repository created: https://github.com/Hakim7777/Jira-Xray-Playwright-TodoMVC-Project
- Node.js and npm installed on Jenkins agent
- Git installed on Jenkins agent

## Jenkins Setup Steps

### 1. Install Required Jenkins Plugins

1. Navigate to **Manage Jenkins** → **Manage Plugins**
2. Install the following plugins (if not already installed):
   - **Pipeline** (workflow-aggregator)
   - **GitHub** (github integration)
   - **Allure** (allure-plugin)
   - **Git** (git plugin)

### 2. Configure GitHub Credentials

1. Go to **Manage Jenkins** → **Manage Credentials**
2. Click **Global credentials (unrestricted)** → **Add Credentials**
3. Select **Username with password** (or SSH key if using SSH)
4. Enter your GitHub credentials
5. Click **Save**

### 3. Create Pipeline Job

1. Navigate to Jenkins dashboard
2. Click **New Item**
3. Enter job name: `todomvc-qa-automation`
4. Select **Pipeline** as job type
5. Click **OK**

### 4. Configure Pipeline Job

#### Build Triggers
1. Check **GitHub hook trigger for GITScm polling**
   - This enables automatic trigger on GitHub push
2. Or configure **Poll SCM** for scheduled polling (e.g., `H */4 * * *` every 4 hours)

#### Pipeline Definition
1. In the **Pipeline** section, select **Pipeline script from SCM**
2. Configure **SCM**:
   - **SCM**: Git
   - **Repository URL**: `https://github.com/Hakim7777/Jira-Xray-Playwright-TodoMVC-Project`
   - **Credentials**: Select the GitHub credentials created above
   - **Branches to build**: `*/main` or `*/master`
   - **Script Path**: `Jenkinsfile`

3. Click **Save**

### 5. Configure GitHub Webhook (Optional but Recommended)

For automatic triggering on code push:

1. Go to your GitHub repository
2. Navigate to **Settings** → **Webhooks** → **Add webhook**
3. Enter **Payload URL**: `http://your-jenkins-url:8080/github-webhook/`
4. Select **Content type**: `application/json`
5. Select events: **Push events** and **Pull request events**
6. Click **Add webhook**

### 6. Initial Job Run

1. Click **Build Now** on the pipeline job
2. Monitor the build in **Build History**
3. Click on the build number to view **Console Output**
4. Verify all stages execute successfully:
   - **Checkout** - GitHub repo cloned
   - **Install** - Dependencies installed
   - **Test** - Playwright tests executed
   - **Report** - HTML and Allure reports generated

## Jenkinsfile Structure

The `Jenkinsfile` defines the following pipeline stages:

```groovy
pipeline {
  agent any
  
  stages {
    stage('Checkout') {
      // Clone repository from GitHub
    }
    
    stage('Install') {
      // Install npm dependencies
    }
    
    stage('Test') {
      // Run Playwright tests (Chromium + WebKit)
    }
    
    stage('Report') {
      // Generate and archive HTML and Allure reports
    }
  }
  
  post {
    // Post-build actions: archive results, cleanup
  }
}
```

## View Test Results

### Playwright HTML Report
1. Navigate to Jenkins job build page
2. Click **Artifacts** → `playwright-report/index.html`
3. View detailed test results, screenshots, and videos

### Allure Report

#### Option 1: Using Allure Plugin

1. Install **Allure** plugin (see step 2 above)
2. In job configuration, add **Post-build Action**: **Allure Report**
3. Configure:
   - **Results path**: `allure-results`
   - **Report path**: `allure-report`
4. Click **Save**
5. After test run, click **Allure Report** link on build page

#### Option 2: Manual Generation

If plugin is not available, generate manually:

```bash
npm run allure:report
```

This generates `allure-report/` folder that can be served.

## Troubleshooting

### Issue: "Could not connect to repository"
**Solution**: Verify GitHub credentials and repository URL. Test connection in credential settings.

### Issue: "npm: command not found"
**Solution**: Ensure Node.js is installed on Jenkins agent or update PATH in Jenkins system configuration.

### Issue: Tests fail in Jenkins but pass locally
**Solution**: 
1. Check browser compatibility (Chromium, WebKit are configured)
2. Verify baseURL is accessible from Jenkins agent
3. Check timeout settings in `playwright.config.ts`
4. Review console output for specific errors

### Issue: Allure report not displaying
**Solution**:
1. Verify Allure plugin is installed
2. Check that `allure-results/` directory exists after test run
3. Verify post-build action configured correctly
4. Check Jenkins logs: **Manage Jenkins** → **System Log**

## Best Practices

1. **Branch Protection**: Configure GitHub branch protection rules for `main` branch
2. **Pipeline Metrics**: Monitor build frequency, pass/fail rates, and execution time
3. **Retention Policy**: Configure Jenkins to archive reports for a limited time:
   - Job Configuration → Build Discarder
   - Keep builds for 30 days or max 100 builds
4. **Notifications**: Configure email or Slack notifications for build failures
5. **Performance**: Monitor test execution time and optimize as needed

## Integration with Jira/Xray

For complete Jira and Xray integration (optional):

1. Create Jira issue linking to GitHub PR
2. Use Xray test management to link Playwright tests to Jira test cases
3. Configure Jenkins to post test results back to Jira/Xray
4. Track coverage metrics through Jira dashboards

## Additional Resources

- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [Playwright Documentation](https://playwright.dev/)
- [Allure Reports](https://docs.qameta.io/allure/)
- [GitHub Actions Alternative](https://github.com/features/actions) (for GitHub-native CI/CD)

---

**Last Updated**: 2024
**Project**: Jira-Xray-Playwright-TodoMVC
**Author**: QA Automation Team
