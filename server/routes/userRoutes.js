const { register, login, verify, setavatar } = require('../controllers/userControllers');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify', verify);
router.post('/setavatar', setavatar);
module.exports = router;