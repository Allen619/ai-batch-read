const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller.js');

router.post('/search', aiController.search);

module.exports = router;
