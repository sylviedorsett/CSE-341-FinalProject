const router = require('express').Router();

const getGradebooksController = require('../controllers/gradebooks');
const validate = require('../middleware/validate');

router.get('/', getGradebooksController.getAllGradebooks);
router.get('/:id', getGradebooksController.getGradebook);
router.post('/', validate.newGradebook, getGradebooksController.postGradebook);
router.put('/:id', validate.newGradebook, getGradebooksController.putGradebook);
router.delete('/:id', getGradebooksController.deleteGradebook);

module.exports = router;
