const express = require('express');
const router = express.Router();
const guideController = require('../controllers/guideController');

router.get('/', guideController.getAllGuides);
router.get('/:formId', guideController.getGuideById);
router.get('/:formId/steps', guideController.getGuideSteps);

module.exports = router;
