const ObjectId = require('mongodb').ObjectId;
const gradebookSchema = require('../models/gradebooks');

// Function to GET all gradebooks from the database
const getAllGradebooks = async (req, res) => {
  try {
    const response = await gradebookSchema.find();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(res.error || 'An internal error occurred. Please try again later.');
  }
};

// Function to GET one gradebook by ID from the database
const getGradebook = async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const gradebookId = new ObjectId(req.params.id);
    const response = await gradebookSchema.find({ _id: gradebookId });
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

// Function to POST a new gradebook to the database
const postGradebook = async (req, res) => {
  try {
    const newGradebook = new gradebookSchema({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      teacher: req.body.teacher,
      class: req.body.class,
      gpa: req.body.gpa,
      assignments: req.body.assignments,
      missingAssignments: req.body.missingAssignments,
      absences: req.body.absences
    });
    await newGradebook.save();
    res.status(201).json(newGradebook);
  } catch (error) {
    res.status(500).json(error || 'An error occurred. Please try again.');
  }
};

// Function to update a gradebook in the database
const putGradebook = async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const gradebookId = new ObjectId(req.params.id);

    const updatedData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      teacher: req.body.teacher,
      class: req.body.class,
      gpa: req.body.gpa,
      assignments: req.body.assignments,
      missingAssignments: req.body.missingAssignments,
      absences: req.body.absences
    };
    const response = await gradebookSchema.replaceOne({ _id: gradebookId }, updatedData);
    if (response.modifiedCount > 0) {
      res.status(204).json(response);
    } else {
      res.status(500).json('An error occurred. Please try again.');
    }
  } else {
    res.status(400).json('Invalid ID entered. Please try again.');
  }
};

// Function to delete a gradebook from the database
const deleteGradebook = async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const gradebookId = new ObjectId(req.params.id);
    const response = await gradebookSchema.deleteOne({ _id: gradebookId });
    if (response.deletedCount > 0) {
      res.status(200).json(response);
    } else {
      res.status(500).json('Unable to delete gradebook. Please try again.');
    }
  } else {
    res.status(400).json('Invalid ID entered. Please try again.');
  }
};

module.exports = {
  getAllGradebooks,
  getGradebook,
  postGradebook,
  putGradebook,
  deleteGradebook
};
