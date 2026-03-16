const aiService = require('../services/aiService');

const availableForms = [
  { id: 'pan', name: 'PAN Card Application', icon: '🪪' },
  { id: 'driving-license', name: 'Driving License', icon: '🚗' },
  { id: 'passport', name: 'Passport Application', icon: '📕' },
  { id: 'scholarship', name: 'National Scholarship', icon: '🎓' }
];

exports.getForms = (req, res) => {
  res.json({ success: true, forms: availableForms });
};

exports.askQuestion = async (req, res) => {
  const { question, formContext } = req.body;
  if (!question || question.trim().length === 0) {
    return res.status(400).json({ success: false, error: 'Question is required' });
  }
  try {
    const answer = await aiService.getAnswer(question.trim(), formContext);
    res.json({
      success: true,
      question: question.trim(),
      answer,
      formContext: formContext || 'general',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Assistant error:', err);
    res.status(500).json({ success: false, error: 'Failed to get answer: ' + err.message });
  }
};
