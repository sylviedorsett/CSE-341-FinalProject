const isAuthenticated = (req, res, next) => {
  if (!req.oidc.isAuthenticated()) {
    return res.status(401).json('You do not have access.');
  }
  console.log(req.oidc);
  next();
};

//Add method isTokenAuthenticated to check if token is authenticated.

module.exports = {
  isAuthenticated
};
