const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "College Database",
    description:
      "An application to get, update, and delete College Course and Instructor information from a database.",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFile = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFile, doc);
