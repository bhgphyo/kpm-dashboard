# KPM Dashboard Deployment Guide

## Overview
This guide covers deploying your KPM Dashboard backend to Render and building Android APK via GitHub Actions.

---

## Part 1: Push to GitHub

### Step 1.1: Initialize Git Repository
```bash
cd /home/kpm/Desktop/KPM_Dashboard
git init
```

### Step 1.2: Create .env File
```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your Gemini API Key
# Get from: https://aistudio.google.com/app/apikey
# File content should be:
# GEMINI_API_KEY=your_actual_api_key_here
```

### Step 1.3: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `kpm-dashboard`
3. Set to **Public**
4. Click "Create repository"
5. **Do NOT** initialize with README (we already have one)

### Step 1.4: Push to GitHub
```bash
git add .
git commit -m "Initial commit: KPM Dashboard with Capacitor and GitHub Actions"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/kpm-dashboard.git
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username**

---

## Part 2: Deploy Backend to Render

### Step 2.1: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub (easier authorization)

### Step 2.2: Create Web Service
1. Click "New +" → "Web Service"
2. Connect your `kpm-dashboard` repository
3. Configure:
   - **Name**: `kpm-dashboard-backend`
   - **Root Directory**: (leave empty)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (select "Free" tier)

### Step 2.3: Add Environment Variables
1. Scroll to "Environment Variables" section
2. Add:
   - Key: `GEMINI_API_KEY`
   - Value: Your actual Gemini API key from Google AI Studio
3. Click "Create Web Service"

### Step 2.4: Get Your Backend URL
1. Wait for deployment (2-5 minutes)
2. Look for the URL like: `https://kpm-dashboard-backend-xxxx.onrender.com`
3. **Save this URL** - you'll need it for the next step!

---

## Part 3: Update Frontend with Backend URL

### Step 3.1: Edit public/index.html
Open `/home/kpm/Desktop/KPM_Dashboard/public/index.html` and find this line (around line 490):
```javascript
const BACKEND_URL = ''; // CHANGE THIS after deploying to Render!
```

Change it to:
```javascript
const BACKEND_URL = 'https://kpm-dashboard-backend-xxxx.onrender.com';
```

**Replace with your actual Render URL from Step 2.4**

### Step 3.2: Push Changes to GitHub
```bash
git add .
git commit -m "Add production backend URL"
git push
```

---

## Part 4: Build Android APK (GitHub Actions)

**No Android Studio needed!** GitHub Actions automatically builds APKs.

### Step 4.1: Trigger APK Build
1. Go to your GitHub repository
2. Click "Actions" tab
3. Click "Build APK" workflow
4. Click "Run workflow" → "Run workflow"

### Step 4.2: Download APK
1. Wait for build to complete (5-10 minutes)
2. Go to the workflow run
3. Download from "Artifacts":
   - `kpm-dashboard.apk` (release version, signed)
   - `kpm-dashboard-debug.apk` (debug version)

### Step 4.3: Install on Phone
1. Transfer APK to your phone
2. Enable "Install from unknown sources" in Android settings
3. Open and install the APK

---

## Project Structure Summary

```
kpm-dashboard/
├── server.js              # Express backend
├── public/                # Static files ( Capacitor web dir)
│   ├── index.html
│   ├── css/
│   ├── js/
│   ├── fonts/
│   └── images/
├── .github/workflows/
│   └── build-apk.yml      # GitHub Actions for APK build
├── capacitor.config.json   # Capacitor configuration
├── package.json
└── README.md
```

---

## Configuration Notes

### Backend URL Configuration
The `BACKEND_URL` variable in `public/index.html` controls API calls:
- **Empty/Local**: Uses relative URLs (for localhost development)
- **Production URL**: Uses your Render backend URL

### Environment Variables on Render
| Variable | Value |
|----------|-------|
| GEMINI_API_KEY | Your Google Gemini API key |

### GitHub Actions Workflow
The workflow at `.github/workflows/build-apk.yml`:
1. Checks out code
2. Sets up Java 17
3. Sets up Android SDK (API 33)
4. Copies frontend files to `public/`
5. Installs Capacitor
6. Builds Android app
7. Uploads APK as artifacts

---

## Troubleshooting

### APK Build Fails
- Check GitHub Actions logs for errors
- Ensure `capacitor.config.json` is valid
- Verify all frontend files are in `public/`

### API Calls Fail
- Verify `BACKEND_URL` is set correctly in `public/index.html`
- Check Render service is running
- Ensure `GEMINI_API_KEY` is set in Render environment variables

### CORS Issues
The backend already has CORS enabled. If issues persist:
- Verify `BACKEND_URL` matches exactly (including https://)
- Check for trailing slashes

---

## Updating the App

### Update Backend
1. Edit `server.js`
2. Push to GitHub
3. Render auto-deploys

### Update Frontend
1. Edit files in `public/`
2. Push to GitHub
3. Trigger GitHub Actions workflow for new APK

---

## Next Steps

1. **Create .env file with your API key**
2. **Push to GitHub** (follow Part 1)
3. **Deploy to Render** (follow Part 2)
4. **Update BACKEND_URL** (follow Part 3)
5. **Build APK** via GitHub Actions (follow Part 4)

Questions? Check the main README.md for additional information.

---

**Happy Deploying! 🚀**

