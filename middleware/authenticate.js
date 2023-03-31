const isAuthenticated = (req, res, next) => {
  if (!req.oidc.isAuthenticated()) {
    return res.status(401).json('You do not have access.');
  }
  console.log(req.oidc);
  next();
};

//Add method isTokenAuthenticated to check if token is authenticated:
const isTokenAuthenticated = (req, res, next) => {
  console.log('VALIDATING TOKEN!');
  console.log(req.query.state);
};

module.exports = {
  isAuthenticated,
  isTokenAuthenticated
};
