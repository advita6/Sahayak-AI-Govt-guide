const path = require('path');
const fs = require('fs');
const imageService = require('../services/imageService');
const pdfService = require('../services/pdfService');

exports.resizePhoto = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No file uploaded' });
  }
  try {
    const { docType = 'pan' } = req.body;
    const result = await imageService.resizePassportPhoto(req.file.path, docType);
    res.json({
      success: true,
      message: 'Photo resized successfully',
      filename: result.filename,
      downloadUrl: `/uploads/${result.filename}`,
      specs: result.specs
    });
  } catch (err) {
    console.error('Photo resize error:', err);
    res.status(500).json({ success: false, error: 'Failed to resize photo: ' + err.message });
  }
};

exports.resizeSignature = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No file uploaded' });
  }
  try {
    const { docType = 'pan' } = req.body;
    const result = await imageService.resizeSignature(req.file.path, docType);
    res.json({
      success: true,
      message: 'Signature resized successfully',
      filename: result.filename,
      downloadUrl: `/uploads/${result.filename}`,
      specs: result.specs
    });
  } catch (err) {
    console.error('Signature resize error:', err);
    res.status(500).json({ success: false, error: 'Failed to resize signature: ' + err.message });
  }
};

exports.compressPdf = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No file uploaded' });
  }
  try {
    const result = await pdfService.compressPdf(req.file.path);
    res.json({
      success: true,
      message: 'PDF processed successfully',
      filename: result.filename,
      downloadUrl: `/uploads/${result.filename}`,
      originalSize: result.originalSize,
      processedSize: result.processedSize,
      reduction: result.reduction
    });
  } catch (err) {
    console.error('PDF compress error:', err);
    res.status(500).json({ success: false, error: 'Failed to process PDF: ' + err.message });
  }
};
