const router = require('express').Router();

router.get('/', (req, res) => {
  req.oidc.user ? res.send(JSON.stringify(req.oidc.user)) : res.redirect('/login');
});

module.exports = router;
