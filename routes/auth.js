const router = require('express').Router();


// auth login
router.get('/login', (req, res) => {
    res.render('login',  { user: req.user });
  });

//auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;