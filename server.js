const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const { initDb, insertFile, listFiles, getFileById } = require('./db');

dotenv.config();

const PORT = process.env.PORT || 3000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

initDb();

// Upload endpoint (files or JSON for text/link)
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (req.file) {
      const record = await insertFile({
        original_name: req.file.originalname,
        mime: req.file.mimetype,
        path: req.file.filename,
        type: 'file'
      });
      return res.json({ ok: true, file: record });
    }

    // If sending text or link
    const { name, content, type } = req.body;
    if (!content) return res.status(400).json({ ok: false, error: 'No content' });
    const record = await insertFile({
      original_name: name || 'inline',
      mime: 'text/plain',
      path: null,
      type: type || 'text',
      content
    });
    return res.json({ ok: true, file: record });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: 'Upload failed' });
  }
});

app.get('/api/files', async (req, res) => {
  const files = await listFiles();
  res.json({ ok: true, files });
});

app.get('/api/files/:id/download', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const file = await getFileById(id);
  if (!file) return res.status(404).json({ ok: false, error: 'Not found' });
  if (file.type === 'file' && file.path) {
    const p = path.join(uploadDir, file.path);
    return res.download(p, file.original_name);
  }
  // for text/link
  res.setHeader('Content-Type', 'text/plain');
  res.send(file.content || '');
});

// Proxy to Gemini (server-side key)
app.post('/api/gemini', async (req, res) => {
  console.log('📥 [Server] Received /api/gemini request');

  if (!GEMINI_API_KEY) {
    console.error('❌ [Server] GEMINI_API_KEY is not configured in .env file');
    return res.status(500).json({
      ok: false,
      error: 'Server missing GEMINI_API_KEY',
      message: 'Please add GEMINI_API_KEY to your .env file. Get it from https://aistudio.google.com/app/apikey'
    });
  }

  const { prompt } = req.body;
  if (!prompt) {
    console.warn('⚠️ [Server] No prompt provided in request');
    return res.status(400).json({ ok: false, error: 'No prompt provided' });
  }

  console.log('📤 [Server] Forwarding request to Google Gemini API...');
  console.log('📝 [Server] Prompt length:', prompt.length, 'characters');

  try {
    const payload = {
      contents: [{ parts: [{ text: prompt }] }]
    };

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${GEMINI_API_KEY}`;
    const r = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    console.log('📥 [Server] Response received from Google, status:', r.status);

    const json = await r.json();

    if (!r.ok) {
      console.error('❌ [Server] Google API Error:', JSON.stringify(json).substring(0, 500));
      return res.status(r.status).json({
        ok: false,
        error: json.error?.message || 'Gemini API request failed',
        details: json
      });
    }

    console.log('✅ [Server] Successfully generated AI response');
    res.json({ ok: true, result: json });
  } catch (err) {
    console.error('❌ [Server] Exception during Gemini API call:', err.message);
    console.error('📍 [Server] Stack:', err.stack);
    res.status(500).json({
      ok: false,
      error: 'AI request failed',
      message: err.message
    });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
