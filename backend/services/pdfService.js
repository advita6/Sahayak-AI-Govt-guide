const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

exports.compressPdf = async (inputPath) => {
  const uploadsDir = path.join(__dirname, '../uploads');
  const timestamp = Date.now();
  const filename = `compressed_document_${timestamp}.pdf`;
  const outputPath = path.join(uploadsDir, filename);

  const originalStats = fs.statSync(inputPath);
  const originalSize = originalStats.size;

  // Read and re-save PDF (removes metadata, optimizes structure)
  const inputBytes = fs.readFileSync(inputPath);
  const pdfDoc = await PDFDocument.load(inputBytes, { ignoreEncryption: true });

  // Remove metadata to reduce size
  pdfDoc.setTitle('');
  pdfDoc.setAuthor('');
  pdfDoc.setSubject('');
  pdfDoc.setKeywords([]);
  pdfDoc.setProducer('GovGuide AI');
  pdfDoc.setCreator('GovGuide AI');

  const pdfBytes = await pdfDoc.save({
    useObjectStreams: true,
    addDefaultPage: false,
    objectsPerTick: 50
  });

  fs.writeFileSync(outputPath, pdfBytes);

  const processedStats = fs.statSync(outputPath);
  const processedSize = processedStats.size;
  const reduction = Math.max(0, Math.round(((originalSize - processedSize) / originalSize) * 100));

  // Clean up input file
  try { fs.unlinkSync(inputPath); } catch (e) {}

  return {
    filename,
    outputPath,
    originalSize: formatBytes(originalSize),
    processedSize: formatBytes(processedSize),
    reduction: `${reduction}% smaller`
  };
};

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}
