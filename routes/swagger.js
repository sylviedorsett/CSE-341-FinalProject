const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');
//const ui = require("swagger-ui-express");
// Method can be called in any place after calling constructor SwaggerUIBundle

/*ui.initOAuth({
  clientId: process.env.CLIENTID,
  clientSecret: process.env.SECRET,
  appName: "Personal Assignment 8",
  additionalQueryStringParams: { test: "hello" },
  useBasicAuthenticationWithAccessCodeGrant: true,
  usePkceWithAuthorizationCodeGrant: true,
}); */
/* Load Swagger UI */
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;
