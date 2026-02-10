# Deployment TODO Checklist

## ✅ Completed Setup
- [x] Created README.md with project documentation
- [x] Created .env.example template
- [x] Created capacitor.config.json for Capacitor
- [x] Created GitHub Actions workflow for APK build
- [x] Created public/ directory with all frontend files
- [x] Updated public/index.html with BACKEND_URL configuration
- [x] Updated all API fetch calls to use getApiUrl() helper
- [x] Created DEPLOYMENT.md with detailed deployment guide

## 📋 Remaining Steps (You Need to Do)

### Step 1: Create .env File with Your API Key
```bash
cd /home/kpm/Desktop/KPM_Dashboard
cp .env.example .env
# Then edit .env and add your GEMINI_API_KEY
```

**Get your Gemini API key from:** https://aistudio.google.com/app/apikey

### Step 2: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: KPM Dashboard with Capacitor and GitHub Actions"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/kpm-dashboard.git
git push -u origin main
```

### Step 3: Deploy to Render
1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect your repository
5. Set Name: `kpm-dashboard-backend`
6. Build Command: `npm install`
7. Start Command: `npm start`
8. **IMPORTANT**: Add `GEMINI_API_KEY` environment variable
9. Wait for deployment and copy your backend URL

### Step 4: Update BACKEND_URL
Edit `/home/kpm/Desktop/KPM_Dashboard/public/index.html`:
```javascript
const BACKEND_URL = 'https://your-render-url.onrender.com';
```
Then push changes to GitHub.

### Step 5: Build APK via GitHub Actions
1. Go to your GitHub repo → "Actions" tab
2. Click "Build APK" workflow
3. Click "Run workflow"
4. Wait for build (5-10 minutes)
5. Download APK from Artifacts

### Step 6: Install on Phone
1. Transfer APK to phone
2. Enable "Install from unknown sources"
3. Install and test!

---

## Quick Commands Reference

```bash
# 1. Navigate to project
cd /home/kpm/Desktop/KPM_Dashboard

# 2. Create .env file
cp .env.example .env
nano .env  # Add your GEMINI_API_KEY

# 3. Initialize and push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/kpm-dashboard.git
git push -u origin main

# 4. After Render deployment, update BACKEND_URL
nano public/index.html
# Change: const BACKEND_URL = 'YOUR_RENDER_URL_HERE'

# 5. Push URL update
git add .
git commit -m "Add production backend URL"
git push
```

---

## Links You'll Need

- **Render**: https://render.com
- **GitHub**: https://github.com
- **Google AI Studio**: https://aistudio.google.com/app/apikey
- **Your GitHub Repo**: https://github.com/YOUR_USERNAME/kpm-dashboard

---

## Expected Timeline
1. GitHub setup: 5 minutes
2. Render deployment: 5 minutes (automatic)
3. APK build: 5-10 minutes (via GitHub Actions)
4. Total: ~20 minutes from start to having APK!

---

Good luck! 🚀

