const ObjectId = require('mongodb').ObjectId;
const instructorSchema = require('../models/instructors');

//Function to GET all instructors from database
const getAllInstructors = async (req, res) => {
  try {
    const response = await instructorSchema.find();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(res.error || 'An internal error occurred. Please try again later.');
  }
};
//Function to GET one Instructor by ID from database
const getInstructor = async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const instructorId = new ObjectId(req.params.id);
    const response = await instructorSchema.find({ _id: instructorId });
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

//Function to POST a new instructor to the database
const postInstructor = async (req, res) => {
  try {
    //create body to hold data
    const newInstructor = new instructorSchema({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      department: req.body.department,
      email: req.body.email,
      tenure: req.body.tenure,
      courses: req.body.courses
    });
    await newInstructor.save();
    res.status(201).json(newInstructor);
  } catch (error) {
    res.status(500).json(error || 'An error occurred. Pleaset try again.');
  }
};

//Function to update an instructor from the database
const putInstructor = async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const instructorId = new ObjectId(req.params.id);

    const updatedData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      department: req.body.department,
      email: req.body.email,
      tenure: req.body.tenure,
      courses: req.body.courses
    };
    const response = await instructorSchema.replaceOne({ _id: instructorId }, updatedData);
    if (response.modifiedCount > 0) {
      res.status(204).json(response);
    } else {
      res.status(500).json('An error occurred. Please try again.');
    }
  } else {
    res.status(400).json('Invalid ID entered. Please try again.');
  }
};

//Function to delete instructor from database
const deleteInstructor = async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const instructorId = new ObjectId(req.params.id);
    const response = await instructorSchema.deleteOne({ _id: instructorId });
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
  getAllInstructors,
  getInstructor,
  postInstructor,
  putInstructor,
  deleteInstructor
};
