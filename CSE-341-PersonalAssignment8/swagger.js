const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Personal Assignment 8",
    description:
      "An application to get, update, and delete College Course and Instructor information from a database.",
  },
  host: "https://personalassignment7.onrender.com",
  schemes: ["https"],
};

const outputFile = "./swagger-output.json";
const endpointsFile = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFile, doc);
