const router = require("express").Router();

router.use("/", require("./swagger"));
router.use("/courses", require("./courses"));
router.use("/instructors", require("./instructors"));

module.exports = router;
