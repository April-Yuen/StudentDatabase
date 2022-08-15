const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController')
// const {ensureAuth, ensureGuest} = require('../middleware/auth')

const Student = require('../models/Student')

// @desc login/landing page
// @route GET/
router.get('/', indexController.getLogin)

module.exports = router;