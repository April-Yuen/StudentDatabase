const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController')
const {ensureAuth, ensureGuest} = require('../middleware/auth')

// App Routes

// router.get('/', ensureAuth, studentController.homepage);
router.post('/search', studentController.searchStudent)
router.get('/submit-student', ensureAuth, studentController.submitStudent)
router.post('/submit-student', ensureAuth, studentController.submitStudentOnPost)
router.get('/delete-student/:id', ensureAuth, studentController.deleteStudent)
router.get('/edit-student/:id', ensureAuth, studentController.editStudent)
router.post('/edit-student/:id', ensureAuth, studentController.editStudentOnPost)

module.exports = router;