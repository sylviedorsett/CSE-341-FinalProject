const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'College Database',
    description:
      'An application to get, update, and delete College Course and Instructor information from a database.'
  },
  host: 'college-api-cse341-final-project.onrender.com',
  schemes: ['https'],
  securityDefinitions: {
    oAuthSample: {
      type: 'oauth2',
      authorizationUrl: 'https://college-api-cse341-final-project.onrender.com/login',
      flow: 'implicit',
      scopes: {
        read_docs: 'read your database collections',
        write_docs: 'modify collections in your database'
      }
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFile = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFile, doc);
