const validator = require("../helpers/validate");

const newInstructor = (req, res, next) => {
  const validateRule = {
    firstName: "required|string",
    lastName: "required|string",
    department: "required|string",
    email: "required|email",
    tenure: "required|boolean",
    course: "required|string",
  };
  validator(req.body, validateRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const newCourse = (req, res, next) => {
  const validateRule = {
    courseTitle: "required|string",
    courseId: "required|string",
    instructor: "required|string",
    classMax: "required|integer",
    currentEnrollment: "required|integer",
    startDate: "required|string",
    endDate: "required|string",
  };
  validator(req.body, validateRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  newInstructor,
  newCourse,
};
