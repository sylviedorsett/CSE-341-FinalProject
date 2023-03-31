const router = require('express').Router();

const getStudentsController = require('../controllers/students');
const validate = require('../middleware/validate');

router.get('/', getStudentsController.getAllStudents);
router.get('/:id', getStudentsController.getStudent);
router.post('/', validate.newStudent, getStudentsController.postStudent);
router.put('/:id', validate.newStudent, getStudentsController.putStudent);
router.delete('/:id', getStudentsController.deleteStudent);

module.exports = router;
