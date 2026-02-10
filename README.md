# KPM Dashboard - Universal IT & AI Mastery Portfolio

A professional portfolio dashboard for Kyaw Phyo Myint, featuring AI-powered career assistance and comprehensive credential showcase.

## Features

- 🤖 **AI Career Assistant** - Gemini-powered career guidance based on credentials
- 📊 **Skill Radar** - Interactive visualization of technical skills
- 🏆 **Certificate Showcase** - Dynamic certificate provider cards
- 📱 **Mobile Ready** - Converted to Android app with Capacitor

## Tech Stack

- **Backend**: Express.js, SQLite, Gemini API Proxy
- **Frontend**: Vanilla HTML/CSS/JS with Tailwind CSS
- **Mobile**: Capacitor.js for Android
- **Deployment**: Render (Backend), GitHub Actions (APK Build)

## Quick Start

### Local Development
```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Add your GEMINI_API_KEY to .env

# Start server
npm run dev
```

### Environment Variables
Create a `.env` file in the root directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
```

## Deployment

### Backend (Render.com)
1. Push to GitHub
2. Connect repository to Render
3. Add `GEMINI_API_KEY` environment variable
4. Deploy automatically

### Android App (APK Build)
APKs are automatically built using GitHub Actions on every push. Download from:
- **Actions** tab → Latest workflow run → Artifacts

## Project Structure
```
KPM_Dashboard/
├── server.js           # Express backend
├── index.html          # Main dashboard
├── db.js              # SQLite database
├── package.json        # Dependencies
├── .env.example       # Environment template
├── public/            # Static files ( Capacitor)
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── fonts/
├── capacitor.config.json  # Capacitor config
└── .github/
    └── workflows/
        └── build-apk.yml  # GitHub Actions APK build
```

## License
MIT License

## Author
**Kyaw Phyo Myint** - Cross-Platform Certified IT & AI Professional

