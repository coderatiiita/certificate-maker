const express = require('express');
const router = express.Router();

const certificate = require('./routes/certificate');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use('/certificate', certificate);

module.exports = router;