const router = require('express').Router();

// USE THE JSON OF THE USER AND RENDER THE PROFILE VIEW WITH HIS INFORMATION
router.get('/', (req, res) => {
  req.oidc.user ? res.render('profile', { user: req.oidc.user }) : res.redirect('/login');
});
/* We're not using this by noe */
// router.post('/api-login', (req) => {
//   const username = req.body.username;
//   const pass = req.body.password;
// });

module.exports = router;
