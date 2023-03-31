const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('home', { user: req.oidc.user });
});

router.use('/api-docs', require('./swagger'));
router.use('/courses', require('./courses'));
router.use('/instructors', require('./instructors'));
router.use('/gradebooks', require('./gradebooks'));
router.use('/students', require('./students'));
router.use('/profile', require('./profile'));

module.exports = router;
