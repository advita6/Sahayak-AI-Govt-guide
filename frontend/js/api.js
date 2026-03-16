// GovGuide AI — API utility (shared across all pages)
const API_BASE = '';

const API = {
  async get(endpoint) {
    const res = await fetch(API_BASE + endpoint);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },

  async post(endpoint, data) {
    const res = await fetch(API_BASE + endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  },

  async upload(endpoint, formData) {
    const res = await fetch(API_BASE + endpoint, {
      method: 'POST',
      body: formData
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  }
};

// Toast notification system
function showToast(message, type = 'default', duration = 3500) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'none';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Format timestamp for chat messages
function formatTime(date = new Date()) {
  return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}
