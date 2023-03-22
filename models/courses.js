const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseTitle: { type: String, required: true },
  courseId: { type: String, required: true },
  instructor: { type: String, required: true },
  classMax: { type: Number, required: true },
  currentEnrollment: { type: Number, required: true },
  startDate: { type: String },
  endDate: { type: String }
});

module.exports = mongoose.model('courses', courseSchema);
