const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  department: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  tenure: { type: Boolean, required: true },
  course: { type: [String], required: true }
});

module.exports = mongoose.model('instructors', instructorSchema);
