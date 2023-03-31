const router = require('express').Router();

const getCoursesController = require('../controllers/courses');
const validate = require('../middleware/validate');

router.get('/', getCoursesController.getAllCourses);
router.get('/:id', getCoursesController.getCourse);
router.post('/', validate.newCourse, getCoursesController.postCourse);
router.put('/:id', validate.newCourse, getCoursesController.putCourse);
router.delete('/:id', getCoursesController.deleteCourse);

module.exports = router;
