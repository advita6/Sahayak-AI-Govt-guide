const express = require('express');
const router = express.Router();
const assistantController = require('../controllers/assistantController');

router.post('/ask', assistantController.askQuestion);
router.get('/forms', assistantController.getForms);

module.exports = router;
