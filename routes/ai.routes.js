const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller');

router.post('/search', aiController.search);
router.post('/batch', aiController.batchProcess);

module.exports = router;
