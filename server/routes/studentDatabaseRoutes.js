const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController')

// App Routes

router.get('/', studentController.homepage);
router.post('/search', studentController.searchStudent)
router.get('/submit-student', studentController.submitStudent)
router.post('/submit-student', studentController.submitStudentOnPost)
router.get('/delete-student/:id', studentController.deleteStudent)
router.get('/edit-student/:id', studentController.editStudent)
router.post('/edit-student/:id', studentController.editStudentOnPost)

module.exports = router;