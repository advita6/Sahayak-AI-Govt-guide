// GovGuide AI — AI Assistant page

let currentForm = 'general';
let isWaiting = false;

const quickQuestionsByForm = {
  general: [
    'What is GovGuide AI?',
    'What forms can you help with?',
    'What is a PAN card?'
  ],
  pan: [
    'What documents are required for PAN?',
    'What does AO Code mean?',
    'Why was my photo rejected?',
    'How long does PAN take?',
    'What is the PAN application fee?',
    'What is Form 49A?'
  ],
  'driving-license': [
    'What documents are needed for DL?',
    'How long does a driving license take?',
    'What is the Parivahan portal?'
  ],
  passport: [
    'What is a Tatkal passport?',
    'What documents are needed for passport?',
    'How long does a passport take?'
  ],
  scholarship: [
    'What is NSP?',
    'Who is eligible for scholarships?',
    'What documents are needed for scholarship?'
  ]
};

function selectForm(btn, formId) {
  currentForm = formId;

  // Update active state
  document.querySelectorAll('.form-select-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  // Update quick questions
  loadQuickQuestions(formId);

  // Add context message in chat
  const names = {
    general: 'General Questions',
    pan: 'PAN Card Application',
    'driving-license': 'Driving License',
    passport: 'Passport Application',
    scholarship: 'National Scholarship'
  };

  addBotMessage(`Form context changed to **${names[formId] || formId}**. Ask me anything about this form!`);
}

function loadQuickQuestions(formId) {
  const container = document.getElementById('quickQuestions');
  const questions = quickQuestionsByForm[formId] || quickQuestionsByForm.general;

  container.innerHTML = `
    <div class="quick-questions-label">Quick Questions</div>
    ${questions.map(q => `
      <button class="quick-btn" onclick="sendQuickQuestion(this)">${q}</button>
    `).join('')}
  `;
}

function sendQuickQuestion(btn) {
  const question = btn.textContent;
  document.getElementById('chatInput').value = question;
  sendMessage();
}

async function sendMessage() {
  if (isWaiting) return;

  const input = document.getElementById('chatInput');
  const question = input.value.trim();
  if (!question) return;

  input.value = '';
  input.style.height = 'auto';

  addUserMessage(question);
  showTyping(true);
  isWaiting = true;

  const sendBtn = document.getElementById('sendBtn');
  sendBtn.disabled = true;

  try {
    // Simulate realistic typing delay
    await delay(800 + Math.random() * 600);

    const data = await API.post('/api/assistant/ask', {
      question,
      formContext: currentForm
    });

    showTyping(false);

    if (data.success) {
      addBotMessage(data.answer);
    } else {
      addBotMessage('Sorry, I had trouble processing that question. Please try again.');
    }
  } catch (err) {
    showTyping(false);
    addBotMessage('⚠️ Connection error. Please check that the server is running at http://localhost:5000 and try again.');
  } finally {
    isWaiting = false;
    sendBtn.disabled = false;
    input.focus();
  }
}

function addUserMessage(text) {
  const messages = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'message user';
  div.innerHTML = `
    <div class="message-avatar">👤</div>
    <div>
      <div class="message-bubble">${escapeHtml(text)}</div>
      <div class="message-time" style="text-align:right;">${formatTime()}</div>
    </div>
  `;
  messages.appendChild(div);
  scrollToBottom();
}

function addBotMessage(text) {
  const messages = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'message bot';
  div.innerHTML = `
    <div class="message-avatar">🤖</div>
    <div>
      <div class="message-bubble">${formatBotText(text)}</div>
      <div class="message-time">${formatTime()}</div>
    </div>
  `;
  messages.appendChild(div);
  scrollToBottom();
}

function formatBotText(text) {
  return escapeHtml(text)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
}

function showTyping(show) {
  document.getElementById('typingIndicator').classList.toggle('show', show);
  if (show) scrollToBottom();
}

function scrollToBottom() {
  const messages = document.getElementById('chatMessages');
  messages.scrollTop = messages.scrollHeight;
}

function clearChat() {
  const messages = document.getElementById('chatMessages');
  messages.innerHTML = `
    <div class="message bot">
      <div class="message-avatar">🤖</div>
      <div>
        <div class="message-bubble">Chat cleared! How can I help you with your government application?</div>
        <div class="message-time">${formatTime()}</div>
      </div>
    </div>
  `;
}

function handleKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
}

function autoResize(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = Math.min(textarea.scrollHeight, 100) + 'px';
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Initialize
loadQuickQuestions('general');
