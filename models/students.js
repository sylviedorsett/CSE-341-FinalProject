const mongoose = require('mongoose');

const studentsSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  major: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  birthdate: { type: String, required: true }
});

module.exports = mongoose.model('students', studentsSchema);
