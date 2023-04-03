//Imports
const server = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('./db/connect');
const { auth } = require('express-openid-connect');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
dotenv.config();

const express = require('express');

/* Define PORT */
const port = process.env.PORT || 3000;

// set view engine
server.set('views', 'views');
server.set('view engine', 'ejs');

/* Auth Configurations */
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUERBASEURL
};

/* Middlewares */
// Added morgan to show in console all the requests to the server
server.use(morgan('dev'));
server.use(auth(config));
server.use(bodyParser.json());
/* Allow all CORS */
server.use(cors());
/* Setup Css  */
server.use(express.static(__dirname + '/frontend'));
server.use('/', require('./routes'));

/* Handle process errors */
process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

/* Initialize DB */
mongoose.initDb((err) => {
  if (err) {
    console.log('Something went wrong.', err);
  } else {
    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
    console.log('Connected to database.');
  }
});

module.exports = server;
