const ui = require("swagger-ui-express");
// Method can be called in any place after calling constructor SwaggerUIBundle

ui.initOAuth({
  clientId: process.env.CLIENTID,
  clientSecret: process.env.SECRET,
  appName: "Personal Assignment 8",
  additionalQueryStringParams: { test: "hello" },
  useBasicAuthenticationWithAccessCodeGrant: true,
  usePkceWithAuthorizationCodeGrant: true,
});
