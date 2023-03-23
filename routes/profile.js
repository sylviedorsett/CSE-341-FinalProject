const router = require('express').Router();

router.get('/', (req, res) => {
  req.oidc.user ? res.send(JSON.stringify(req.oidc.user)) : res.redirect('/auth/login');
});

// Code to check if the user is already login, it's the same purpose than line 4 code.
// const authCheck = (req, res, next) => {
//   if(!req.user){
//       res.redirect('/auth/login');
//   } else {
//       next();
//   }
// };

// router.get('/', authCheck, (req, res) => {
//   res.render('profile', { user: req.user });
// });


module.exports = router;
