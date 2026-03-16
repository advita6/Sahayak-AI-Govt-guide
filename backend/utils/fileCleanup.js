const fs = require('fs');
const path = require('path');

const UPLOADS_DIR = path.join(__dirname, '../uploads');
const MAX_AGE_MS = 2 * 60 * 60 * 1000; // 2 hours

exports.cleanupOldFiles = () => {
  if (!fs.existsSync(UPLOADS_DIR)) return;

  const now = Date.now();
  let deleted = 0;

  try {
    const files = fs.readdirSync(UPLOADS_DIR);
    for (const file of files) {
      if (file === '.gitkeep') continue;
      const filePath = path.join(UPLOADS_DIR, file);
      try {
        const stats = fs.statSync(filePath);
        if (!stats.isFile()) continue;
        if (now - stats.mtimeMs > MAX_AGE_MS) {
          fs.unlinkSync(filePath);
          deleted++;
        }
      } catch (e) {
        // File may have been deleted between readdir and statSync — ignore
      }
    }
    if (deleted > 0) {
      console.log(`[Cleanup] Removed ${deleted} old file(s) from uploads/`);
    }
  } catch (err) {
    console.error('[Cleanup] Error scanning uploads dir:', err.message);
  }
};
