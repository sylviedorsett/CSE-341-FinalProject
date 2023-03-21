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

/*    "securityDefinitions": {
        "courses_auth": {
          "type": "oauth2",
          "authorizationUrl": "https://personalassignment7.onrender.com/authorize" ,
          "flow": "implicit",
          "x-google-issuer": "https://personalassignment7.onrender.com/"
          "scopes": {
            "read:courses": "Access to read the courses collection.",
            "write:courses": "Modify courses collection"
          }
      }
    }
  }, */
