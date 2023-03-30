const router = require('express').Router();

const getStudentsController = require('../controllers/students');
const validate = require('../middleware/validate');
const auth = require('../middleware/authenticate.js');

router.get('/', getStudentsController.getAllStudents);
router.get('/:id', getStudentsController.getStudent);
router.post('/', auth.isAuthenticated, validate.newStudent, getStudentsController.postStudent);
router.put('/:id', auth.isAuthenticated, validate.newStudent, getStudentsController.putStudent);
router.delete('/:id', getStudentsController.deleteStudent);

module.exports = router;
