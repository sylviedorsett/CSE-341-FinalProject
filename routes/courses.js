const router = require("express").Router();

const getCoursesController = require("../controllers/courses");
const validate = require("../middleware/validate");
const auth = require("../middleware/authenticate.js");

router.get("/", getCoursesController.getAllCourses);
router.get("/:id", getCoursesController.getCourse);
router.post("/", auth.isAuthenticated, validate.newCourse, getCoursesController.postCourse);
router.put("/:id", auth.isAuthenticated, validate.newCourse, getCoursesController.putCourse);
router.delete("/:id", getCoursesController.deleteCourse);

module.exports = router;
