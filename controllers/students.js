const ObjectId = require('mongodb').ObjectId;
const studentSchema = require('../models/students');

// Function to GET all students from the database
const getAllStudents = async (req, res) => {
    try {
        const response = await studentSchema.find();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(res.error || 'An internal error occurred. Please try again later.');
    }
};

// Function to GET one student by ID from the database
const getStudent = async (req, res) => {
    try {
        if (ObjectId.isValid(req.params.id)) {
            const studentId = new ObjectId(req.params.id);
            const response = await studentSchema.find({ _id: studentId });
            if (response.length === 0) {
                res.status(400).json('No student with that ID exists.');
                return;
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(response);
        } else {
            res.status(400).json('Invalid ID entered. Please try again.');
        }
    } catch (error) {
        res.status(500).json(res.error || 'An internal error occurred. Please try again later.');
    }
};

// Function to POST a new student to the database
const postStudent = async (req, res) => {
    try {
        const newStudent = new studentSchema({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            major: req.body.major,
            email: req.body.email,
            birthdate: req.body.birthdate
        });
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(500).json(error || 'An error occurred. Please try again.');
    }
};

// Function to update a student by id in the database
const putStudent = async (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        const studentId = new ObjectId(req.params.id);

        const updatedData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            major: req.body.major,
            email: req.body.email,
            birthdate: req.body.birthdate
        };
        const response = await studentSchema.replaceOne({ _id: studentId }, updatedData);
        if (response.modifiedCount > 0) {
            res.status(204).json(response);
        } else {
            res.status(500).json('An error occurred. Please try again.');
        }
    } else {
        res.status(400).json('Invalid ID entered. Please try again.');
    }
};

// Function to delete a student by id from the database
const deleteStudent = async (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        const studentId = new ObjectId(req.params.id);
        const response = await studnetSchema.deleteOne({ _id: studentId });
        if (response.deletedCount > 0) {
            res.status(200).json(response);
        } else {
            res.status(500).json('Unable to delete student. Please try again.');
        }
    } else {
        res.status(400).json('Invalid ID entered. Please try again.');
    }
};

module.exports = {
    getAllStudents,
    getStudent,
    postStudent,
    putStudent,
    deleteStudent
};