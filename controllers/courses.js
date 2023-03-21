const ObjectId = require('mongodb').ObjectId;
const courseSchema = require('../models/courses');

//Function to GET all coures from database
const getAllCourses = async (req, res) => {
  try {
    const response = await courseSchema.find();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(res.error || 'An internal error occurred. Please try again later.');
  }
};

//Function to GET one course by ID from database
const getCourse = async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const courseId = new ObjectId(req.params.id);
    const response = await courseSchema.find({ _id: courseId });
    if (response.length === 0) {
      res.status(400).json('No ID by that number exists.');
      return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(response);
  } else {
    res.status(400).json('Invalid ID entered. Please try again.');
  }
};

//Function to POST a new course to the database
const postCourse = async (req, res) => {
  try {
    //Create body to hold data
    const newCourse = new courseSchema({
      courseTitle: req.body.courseTitle,
      courseId: req.body.courseId,
      instructor: req.body.instructor,
      classMax: req.body.classMax,
      currentEnrollment: req.body.currentEnrollment,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json(error || 'An error occurred. Please try again.');
  }
};

//Function to update a course from the database
const putCourse = async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const courseId = new ObjectId(req.params.id);

    const updatedData = {
      courseTitle: req.body.courseTitle,
      courseId: req.body.courseId,
      instructor: req.body.instructor,
      classMax: req.body.classMax,
      currentEnrollment: req.body.currentEnrollment,
      startDate: req.body.startDate,
      endDate: req.body.endDate
    };
    const response = await courseSchema.replaceOne({ _id: courseId }, updatedData);
    if (response.modifiedCount > 0) {
      res.status(204).json(response);
    } else {
      res.status(500).json('An error occurred. Please try again.');
    }
  } else {
    res.status(400).json('Invalid ID entered. Please try again.');
  }
};

//Function to delete course from database
const deleteCourse = async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const courseId = new ObjectId(req.params.id);
    const response = await courseSchema.deleteOne({ _id: courseId });
    if (response.deletedCount > 0) {
      res.status(200).json(response);
    } else {
      res.status(500).json('Unable to delete contact. Please try again.');
    }
  } else {
    res.status(400).json('Invalid ID entered. Please try again.');
  }
};

module.exports = {
  getAllCourses,
  getCourse,
  postCourse,
  putCourse,
  deleteCourse
};
