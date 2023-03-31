const router = require('express').Router();
const { isTokenAuthenticated } = require('../middleware/authenticate');

/* After login, Auth0 posts a randomly generated cifred token to this route */
router.post('/', isTokenAuthenticated);

module.exports = router;
