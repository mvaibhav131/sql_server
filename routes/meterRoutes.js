const express = require('express');
const getMeterByMid = require('../controllers/meterController');
const router = express.Router();

router.get('/getMeter',getMeterByMid);

module.exports=router;