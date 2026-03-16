// GovGuide AI — Guides listing page

const formIcons = {
  pan: '🪪',
  'driving-license': '🚗',
  passport: '📕',
  scholarship: '🎓'
};

const difficultyColors = {
  Easy: 'badge-success',
  Medium: 'badge-accent',
  Hard: 'badge-gray'
};

async function loadGuides() {
  const grid = document.getElementById('guidesGrid');
  try {
    const data = await API.get('/api/guides');
    if (!data.guides || data.guides.length === 0) {
      grid.innerHTML = '<p>No guides available.</p>';
      return;
    }

    grid.innerHTML = data.guides.map(g => `
      <div class="guide-card ${g.comingSoon ? 'coming-soon' : ''}">
        <div class="guide-card-icon">${formIcons[g.id] || '📋'}</div>
        ${g.comingSoon ? '<span class="badge badge-coming" style="position:absolute;top:16px;right:16px;">Coming Soon</span>' : ''}
        <div class="guide-card-title">${g.title}</div>
        <div class="guide-card-desc">${g.description}</div>
        <div class="guide-card-meta">
          <span>🏛️ ${g.authority}</span>
          <span>⏱️ ${g.processingTime}</span>
          <span>💰 ${g.fee}</span>
          <span>📶 ${g.totalSteps} steps</span>
        </div>
        <div style="display:flex;gap:8px;align-items:center;margin-bottom:16px;">
          <span class="badge ${difficultyColors[g.difficulty] || 'badge-gray'}">${g.difficulty}</span>
        </div>
        ${g.comingSoon
          ? '<button class="btn btn-outline btn-full" disabled style="opacity:0.5;cursor:not-allowed;">Guide Coming Soon</button>'
          : `<a href="/guide-${g.id}" class="btn btn-primary btn-full">Start Guide →</a>`
        }
      </div>
    `).join('');
  } catch (err) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:48px;">
        <div style="font-size:2rem;margin-bottom:12px;">⚠️</div>
        <p style="color:var(--danger);">Failed to load guides. Make sure the server is running at http://localhost:5000</p>
        <button onclick="loadGuides()" class="btn btn-primary" style="margin-top:16px;">Retry</button>
      </div>`;
  }
}

loadGuides();
