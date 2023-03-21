const mongoose = require("mongoose");

const gradebooksSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  teacher: { type: String, required: true },
  class: { type: String, required: true },
  gpa: { type: Number, required: true },
  assignments: { type: Array, required: true },
  missingAssignments: { type: Number, required: true },
  absences: { type: Number, required: true },
});

module.exports = mongoose.model("gradebooks", gradebooksSchema);
