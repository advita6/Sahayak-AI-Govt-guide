require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Resolve base directory correctly whether run from project root or backend/
const BACKEND_DIR = path.join(__dirname);
const FRONTEND_DIR = path.join(__dirname, '../frontend');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

const guideRoutes = require('./routes/guideRoutes');
const toolRoutes = require('./routes/toolRoutes');
const assistantRoutes = require('./routes/assistantRoutes');
const { cleanupOldFiles } = require('./utils/fileCleanup');

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure uploads directory exists before any requests come in
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded/processed files (must come before static to take priority on /uploads)
app.use('/uploads', express.static(UPLOADS_DIR));

// Serve static frontend files
app.use(express.static(FRONTEND_DIR));

// API Routes
app.use('/api/guides', guideRoutes);
app.use('/api/tools', toolRoutes);
app.use('/api/assistant', assistantRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'GovGuide AI server is running', port: PORT });
});

// Frontend page routes — explicit HTML pages
const pages = {
  '/':           'index.html',
  '/guides':     'guides.html',
  '/guide-pan':  'guide-pan.html',
  '/tools':      'tools.html',
  '/assistant':  'assistant.html'
};

Object.entries(pages).forEach(([route, file]) => {
  app.get(route, (req, res) => {
    const filePath = path.join(FRONTEND_DIR, file);
    if (!fs.existsSync(filePath)) {
      return res.status(404).send('Page not found');
    }
    res.sendFile(filePath);
  });
});

// Catch-all: for any /guide-:id pattern, serve guide-pan.html if the file exists
app.get('/guide-:formId', (req, res) => {
  const { formId } = req.params;
  const guideFile = path.join(FRONTEND_DIR, `guide-${formId}.html`);
  if (fs.existsSync(guideFile)) {
    return res.sendFile(guideFile);
  }
  // Fallback: serve guides listing
  res.redirect('/guides');
});

// 404 handler — return JSON for API routes, redirect to home for page routes
app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  res.redirect('/');
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  if (req.path.startsWith('/api/')) {
    return res.status(500).json({ error: 'Internal server error', message: err.message });
  }
  res.status(500).send('Internal server error');
});

// Cleanup old uploaded files every hour
setInterval(cleanupOldFiles, 60 * 60 * 1000);

app.listen(PORT, () => {
  console.log('');
  console.log('  ╔══════════════════════════════════════╗');
  console.log('  ║       GovGuide AI Server             ║');
  console.log(`  ║   Running at http://localhost:${PORT}  ║`);
  console.log('  ╚══════════════════════════════════════╝');
  console.log('');
  console.log(`  Frontend : ${FRONTEND_DIR}`);
  console.log(`  Uploads  : ${UPLOADS_DIR}`);
  console.log('');
});

module.exports = app;
