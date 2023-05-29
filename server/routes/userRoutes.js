const { register, login, verify } = require('../controllers/userControllers');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify', verify)
module.exports = router;