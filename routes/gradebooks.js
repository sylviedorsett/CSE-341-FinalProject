const router = require('express').Router();

const getGradebooksController = require('../controllers/gradebooks');
const validate = require('../middleware/validate');
const auth = require('../middleware/authenticate.js');

router.get('/', getGradebooksController.getAllGradebooks);
router.get('/:id', getGradebooksController.getGradebook);
router.post(
  '/',
  auth.isAuthenticated,
  validate.newGradebook,
  getGradebooksController.postGradebook
);
router.put(
  '/:id',
  auth.isAuthenticated,
  validate.newGradebook,
  getGradebooksController.putGradebook
);
router.delete('/:id', getGradebooksController.deleteGradebook);

module.exports = router;
