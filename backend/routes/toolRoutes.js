const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const toolController = require('../controllers/toolController');

// Resolve uploads dir relative to THIS file (backend/routes/ -> backend/uploads/)
const UPLOADS_DIR = path.join(__dirname, '../uploads');

// Ensure uploads dir exists (defensive — server.js also does this at startup)
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `upload_${uuidv4()}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, and PDF files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

router.post('/resize-photo', upload.single('file'), toolController.resizePhoto);
router.post('/resize-signature', upload.single('file'), toolController.resizeSignature);
router.post('/compress-pdf', upload.single('file'), toolController.compressPdf);

// Multer-specific error handler (file type / size rejections)
// Must have 4 parameters to be treated as error middleware by Express
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ success: false, error: 'File too large. Maximum allowed size is 10MB.' });
    }
    return res.status(400).json({ success: false, error: `Upload error: ${err.message}` });
  }
  if (err && err.message) {
    return res.status(400).json({ success: false, error: err.message });
  }
  next(err);
});

module.exports = router;
