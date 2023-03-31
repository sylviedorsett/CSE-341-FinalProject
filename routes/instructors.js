const router = require('express').Router();

const getInstructorsController = require('../controllers/instructors');
const validate = require('../middleware/validate');

router.get('/', getInstructorsController.getAllInstructors);
router.get('/:id', getInstructorsController.getInstructor);
router.post('/', validate.newInstructor, getInstructorsController.postInstructor);
router.put('/:id', validate.newInstructor, getInstructorsController.putInstructor);
router.delete('/:id', getInstructorsController.deleteInstructor);

module.exports = router;
