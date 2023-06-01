const { register, login, verify, setavatar, getaAlUsers } = require('../controllers/userControllers');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.post('/verify', verify);
router.post('/setavatar', setavatar);
router.post('/allusers', getaAlUsers);

module.exports = router;