# CI/CD Deployment Setup

This repository uses GitHub Actions to automatically deploy the `embalagens` folder to IONOS hosting via SFTP.

## How It Works

- **Trigger**: Automatically deploys when you push changes to the `main` branch that affect files in the `embalagens/` folder
- **Manual Deploy**: You can also trigger deployment manually from the GitHub Actions tab

## Required GitHub Secrets

To enable automatic deployment, you need to add these secrets to your GitHub repository:

### Steps to Add Secrets:

1. Go to your GitHub repository
2. Click on **Settings** (top menu)
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret** for each of the following:

### Required Secrets:

| Secret Name | Description |
|------------|-------------|
| `SFTP_HOST` | Your IONOS SFTP server address |
| `SFTP_USERNAME` | Your IONOS SFTP username |
| `SFTP_PASSWORD` | Your IONOS SFTP password |

## Testing the Deployment

After adding the secrets:

1. Make a small change to any file in `embalagens/`
2. Commit and push to the `main` branch
3. Go to the **Actions** tab in your GitHub repository
4. Watch the deployment workflow run
5. Verify files appear on your IONOS server

## Excluded Files

The following files/folders are excluded from deployment:
- `.git` files and folders
- `.DS_Store` (Mac system files)
- `node_modules/` (if any)
- `README.md` files

## Manual Deployment

To manually trigger a deployment:
1. Go to the **Actions** tab
2. Click on **Deploy Embalagens to IONOS**
3. Click **Run workflow** button
4. Select the `main` branch
5. Click **Run workflow**
