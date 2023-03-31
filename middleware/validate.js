const validator = require('../helpers/validate');

const newInstructor = (req, res, next) => {
  const validateRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    department: 'required|string',
    email: 'required|email',
    tenure: 'required|boolean',
    course: 'required|string'
  };
  validator(req.body, validateRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const newCourse = (req, res, next) => {
  const validateRule = {
    courseTitle: 'required|string',
    courseId: 'required|string',
    instructor: 'required|string',
    classMax: 'required|integer',
    currentEnrollment: 'required|integer',
    startDate: 'required|string',
    endDate: 'required|string'
  };
  validator(req.body, validateRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const newStudent = (req, res, next) => {
  const validateRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    major: 'required|string',
    email: 'required|email',
    birthdate: 'required|string'
  };
  validator(req.body, validateRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const newGradebook = (req, res, next) => {
  const validateRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    teacher: 'required|string',
    class: 'required|string',
    gpa: 'required|integer',
    assignments: 'required|array',
    missingAssignments: 'required|integer',
    absences: 'required|integer'
  };
  validator(req.body, validateRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  newInstructor,
  newCourse,
  newGradebook,
  newStudent
};
