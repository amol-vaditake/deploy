const { Router } = require('express');

const { loginUser, logoutUser, changePass } = require('../controllers/users');
const auth = require('../middlewares/auth');

const router = Router();
router.post('/login', loginUser);
router.post('/logout', auth, logoutUser);
router.post('/changePassword', auth, changePass);

module.exports = router;
