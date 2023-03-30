const router = require('express').Router();

const getInstructorsController = require('../controllers/instructors');
const validate = require('../middleware/validate');
const auth = require('../middleware/authenticate.js');

router.get('/', getInstructorsController.getAllInstructors);
router.get('/:id', getInstructorsController.getInstructor);
router.post(
  '/'
  // auth.isAuthenticated,
  // validate.newInstructor,
  // getInstructorsController.postInstructor
);
router.put(
  '/:id',
  auth.isAuthenticated,
  validate.newInstructor,
  getInstructorsController.putInstructor
);
router.delete('/:id', getInstructorsController.deleteInstructor);

module.exports = router;
