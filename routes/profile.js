const router = require('express').Router();

// GET JSON OF USER AND DO NOTHING
/*router.get('/', (req, res) => {
  req.oidc.user ? res.send(JSON.stringify(req.oidc.user)) : res.redirect('/auth/login');
});*/

// USE THE JSON OF THE USER AND RENDER THE PROFILE VIEW WITH HIS INFORMATION
router.get('/', (req, res) => {
  req.oidc.user ? res.render('profile', { user: req.oidc.user }) : res.redirect('/login');
});

module.exports = router;
