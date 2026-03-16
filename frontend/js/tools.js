// GovGuide AI — Document Tools page

let photoFile = null;
let sigFile = null;
let pdfFile = null;

// ── Shared helper ────────────────────────────────────
function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function setUploadAreaSuccess(areaId, file) {
  const area = document.getElementById(areaId);
  if (!area) return;
  area.innerHTML = `
    <div class="upload-icon">✅</div>
    <div class="upload-title">${file.name}</div>
    <div class="upload-sub">${formatFileSize(file.size)} — Ready to process</div>
  `;
}

// ── Photo Tool ──────────────────────────────────────
function handlePhotoUpload(input) {
  const file = input.files[0];
  if (!file) return;
  photoFile = file;
  setUploadAreaSuccess('photoUploadArea', file);
  document.getElementById('photoBtn').disabled = false;
  updatePhotoSpecs();
}

function updatePhotoSpecs() {
  const type = document.getElementById('photoDocType').value;
  const specs = {
    pan: '30×40mm',
    passport: '35×45mm',
    'driving-license': '30×40mm',
    scholarship: '30×40mm'
  };
  const el = document.getElementById('photoSpecSize');
  if (el) el.textContent = specs[type] || '30×40mm';
}

const photoDocTypeEl = document.getElementById('photoDocType');
if (photoDocTypeEl) photoDocTypeEl.addEventListener('change', updatePhotoSpecs);

async function uploadPhoto() {
  if (!photoFile) {
    showToast('Please select a photo first', 'error');
    return;
  }
  const btn = document.getElementById('photoBtn');
  const docType = document.getElementById('photoDocType').value;

  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> Resizing…';

  try {
    const formData = new FormData();
    formData.append('file', photoFile);
    formData.append('docType', docType);

    const data = await API.upload('/api/tools/resize-photo', formData);

    if (data.success) {
      document.getElementById('photoFilename').textContent = data.filename;
      document.getElementById('photoSpecs').textContent =
        data.specs.dimensions + ' • ' + data.specs.format + ' • Max ' + data.specs.maxSize;
      const dl = document.getElementById('photoDownload');
      dl.href = data.downloadUrl;
      dl.download = data.filename;
      document.getElementById('photoResult').classList.add('show');
      showToast('Photo resized successfully!', 'success');
    } else {
      showToast('Error: ' + (data.error || 'Failed to resize photo'), 'error');
    }
  } catch (err) {
    showToast('Upload failed: ' + err.message, 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = 'Resize Photo';
  }
}

// ── Signature Tool ──────────────────────────────────
function handleSigUpload(input) {
  const file = input.files[0];
  if (!file) return;
  sigFile = file;
  setUploadAreaSuccess('sigUploadArea', file);
  document.getElementById('sigBtn').disabled = false;
}

async function uploadSignature() {
  if (!sigFile) {
    showToast('Please select a signature image first', 'error');
    return;
  }
  const btn = document.getElementById('sigBtn');
  const docType = document.getElementById('sigDocType').value;

  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> Resizing…';

  try {
    const formData = new FormData();
    formData.append('file', sigFile);
    formData.append('docType', docType);

    const data = await API.upload('/api/tools/resize-signature', formData);

    if (data.success) {
      document.getElementById('sigFilename').textContent = data.filename;
      document.getElementById('sigSpecs').textContent =
        data.specs.dimensions + ' • ' + data.specs.format + ' • Max ' + data.specs.maxSize;
      const dl = document.getElementById('sigDownload');
      dl.href = data.downloadUrl;
      dl.download = data.filename;
      document.getElementById('sigResult').classList.add('show');
      showToast('Signature resized successfully!', 'success');
    } else {
      showToast('Error: ' + (data.error || 'Failed to resize signature'), 'error');
    }
  } catch (err) {
    showToast('Upload failed: ' + err.message, 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = 'Resize Signature';
  }
}

// ── PDF Tool ────────────────────────────────────────
function handlePdfUpload(input) {
  const file = input.files[0];
  if (!file) return;
  pdfFile = file;
  setUploadAreaSuccess('pdfUploadArea', file);
  document.getElementById('pdfBtn').disabled = false;
}

async function uploadPdf() {
  if (!pdfFile) {
    showToast('Please select a PDF file first', 'error');
    return;
  }
  const btn = document.getElementById('pdfBtn');

  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> Compressing…';

  try {
    const formData = new FormData();
    formData.append('file', pdfFile);

    const data = await API.upload('/api/tools/compress-pdf', formData);

    if (data.success) {
      document.getElementById('pdfFilename').textContent = data.filename;
      document.getElementById('pdfSpecs').textContent =
        data.originalSize + ' → ' + data.processedSize + ' (' + data.reduction + ')';
      const dl = document.getElementById('pdfDownload');
      dl.href = data.downloadUrl;
      dl.download = data.filename;
      document.getElementById('pdfResult').classList.add('show');
      showToast('PDF compressed successfully!', 'success');
    } else {
      showToast('Error: ' + (data.error || 'Failed to compress PDF'), 'error');
    }
  } catch (err) {
    showToast('Upload failed: ' + err.message, 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = 'Compress PDF';
  }
}

// ── Drag & Drop (unified handler) ──────────────────
function setupDragDrop(areaId, acceptTypes, onFileDrop) {
  const area = document.getElementById(areaId);
  if (!area) return;

  area.addEventListener('dragover', function(e) {
    e.preventDefault();
    area.classList.add('dragover');
  });

  area.addEventListener('dragleave', function(e) {
    if (!area.contains(e.relatedTarget)) {
      area.classList.remove('dragover');
    }
  });

  area.addEventListener('drop', function(e) {
    e.preventDefault();
    area.classList.remove('dragover');
    var files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    var file = files[0];
    if (acceptTypes.length && !acceptTypes.includes(file.type)) {
      showToast('Invalid file type. Accepted: ' + acceptTypes.join(', '), 'error');
      return;
    }
    onFileDrop(file);
  });
}

// Wire up drag-and-drop for all three tools
setupDragDrop(
  'photoUploadArea',
  ['image/jpeg', 'image/jpg', 'image/png'],
  function(file) {
    photoFile = file;
    setUploadAreaSuccess('photoUploadArea', file);
    document.getElementById('photoBtn').disabled = false;
    updatePhotoSpecs();
  }
);

setupDragDrop(
  'sigUploadArea',
  ['image/jpeg', 'image/jpg', 'image/png'],
  function(file) {
    sigFile = file;
    setUploadAreaSuccess('sigUploadArea', file);
    document.getElementById('sigBtn').disabled = false;
  }
);

setupDragDrop(
  'pdfUploadArea',
  ['application/pdf'],
  function(file) {
    pdfFile = file;
    setUploadAreaSuccess('pdfUploadArea', file);
    document.getElementById('pdfBtn').disabled = false;
  }
);
