// IMPORTANT INFO: Swagger tags were added. 
const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('home',  { user: req.user });
});

// router.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

router.use('/api-docs', require('./swagger'));
router.use('/courses', require('./courses'));
router.use('/instructors', require('./instructors'));
router.use('/profile', require('./profile'));
router.use('/auth', require('./auth'));

module.exports = router;