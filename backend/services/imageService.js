const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const photoSpecs = {
  pan: {
    widthPx: 354, heightPx: 472, widthMM: 30, heightMM: 40,
    label: 'PAN Card Passport Photo (30×40mm)', maxKB: 50,
    background: { r: 255, g: 255, b: 255, alpha: 1 }
  },
  passport: {
    widthPx: 413, heightPx: 531, widthMM: 35, heightMM: 45,
    label: 'Passport Photo (35×45mm)', maxKB: 50,
    background: { r: 255, g: 255, b: 255, alpha: 1 }
  },
  'driving-license': {
    widthPx: 354, heightPx: 472, widthMM: 30, heightMM: 40,
    label: 'Driving License Photo (30×40mm)', maxKB: 50,
    background: { r: 255, g: 255, b: 255, alpha: 1 }
  },
  scholarship: {
    widthPx: 354, heightPx: 472, widthMM: 30, heightMM: 40,
    label: 'Scholarship Photo (30×40mm)', maxKB: 50,
    background: { r: 255, g: 255, b: 255, alpha: 1 }
  }
};

const signatureSpecs = {
  pan: {
    widthPx: 826, heightPx: 236, widthMM: 70, heightMM: 20,
    label: 'PAN Card Signature (70×20mm)', maxKB: 30,
    background: { r: 255, g: 255, b: 255, alpha: 1 }
  },
  passport: {
    widthPx: 590, heightPx: 177, widthMM: 50, heightMM: 15,
    label: 'Passport Signature (50×15mm)', maxKB: 30,
    background: { r: 255, g: 255, b: 255, alpha: 1 }
  }
};

const UPLOADS_DIR = path.join(__dirname, '../uploads');

function safeUnlink(filePath) {
  try { fs.unlinkSync(filePath); } catch (e) { /* ignore */ }
}

/**
 * Resize a passport-style photo to the spec for the given docType.
 * Uses a temp file for the quality-reduction retry to avoid write conflicts.
 */
exports.resizePassportPhoto = async (inputPath, docType = 'pan') => {
  const spec = photoSpecs[docType] || photoSpecs.pan;
  const timestamp = Date.now();
  const filename = `${docType}_passport_photo_${spec.widthMM}x${spec.heightMM}_${timestamp}.jpg`;
  const outputPath = path.join(UPLOADS_DIR, filename);
  const tempPath = path.join(UPLOADS_DIR, `tmp_${timestamp}.jpg`);

  // First pass at quality 90
  await sharp(inputPath)
    .resize(spec.widthPx, spec.heightPx, { fit: 'cover', position: 'top' })
    .flatten({ background: spec.background })
    .jpeg({ quality: 90 })
    .toFile(tempPath);

  const stats = fs.statSync(tempPath);

  if (stats.size > spec.maxKB * 1024) {
    // Second pass at reduced quality — write to a different temp file
    const temp2Path = path.join(UPLOADS_DIR, `tmp2_${timestamp}.jpg`);
    const quality = Math.max(Math.floor((spec.maxKB * 1024 / stats.size) * 90), 60);
    await sharp(inputPath)
      .resize(spec.widthPx, spec.heightPx, { fit: 'cover', position: 'top' })
      .flatten({ background: spec.background })
      .jpeg({ quality })
      .toFile(temp2Path);
    safeUnlink(tempPath);
    fs.renameSync(temp2Path, outputPath);
  } else {
    fs.renameSync(tempPath, outputPath);
  }

  safeUnlink(inputPath);

  return {
    filename,
    outputPath,
    specs: {
      label: spec.label,
      dimensions: `${spec.widthPx}x${spec.heightPx}px (${spec.widthMM}x${spec.heightMM}mm)`,
      format: 'JPEG',
      maxSize: `${spec.maxKB}KB`
    }
  };
};

/**
 * Resize a signature image to the spec for the given docType.
 */
exports.resizeSignature = async (inputPath, docType = 'pan') => {
  const spec = signatureSpecs[docType] || signatureSpecs.pan;
  const timestamp = Date.now();
  const filename = `${docType}_signature_${spec.widthMM}x${spec.heightMM}_${timestamp}.jpg`;
  const outputPath = path.join(UPLOADS_DIR, filename);
  const tempPath = path.join(UPLOADS_DIR, `tmp_sig_${timestamp}.jpg`);

  await sharp(inputPath)
    .resize(spec.widthPx, spec.heightPx, { fit: 'contain', background: spec.background })
    .flatten({ background: spec.background })
    .jpeg({ quality: 90 })
    .toFile(tempPath);

  const stats = fs.statSync(tempPath);

  if (stats.size > spec.maxKB * 1024) {
    const temp2Path = path.join(UPLOADS_DIR, `tmp_sig2_${timestamp}.jpg`);
    const quality = Math.max(Math.floor((spec.maxKB * 1024 / stats.size) * 90), 60);
    await sharp(inputPath)
      .resize(spec.widthPx, spec.heightPx, { fit: 'contain', background: spec.background })
      .flatten({ background: spec.background })
      .jpeg({ quality })
      .toFile(temp2Path);
    safeUnlink(tempPath);
    fs.renameSync(temp2Path, outputPath);
  } else {
    fs.renameSync(tempPath, outputPath);
  }

  safeUnlink(inputPath);

  return {
    filename,
    outputPath,
    specs: {
      label: spec.label,
      dimensions: `${spec.widthPx}x${spec.heightPx}px (${spec.widthMM}x${spec.heightMM}mm)`,
      format: 'JPEG',
      maxSize: `${spec.maxKB}KB`
    }
  };
};
