const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('home', { user: req.oidc.user });
});

router.use('/api-docs', require('./swagger'));
router.use('/courses', require('./courses'));
router.use('/instructors', require('./instructors'));
router.use('/profile', require('./profile'));

module.exports = router;
