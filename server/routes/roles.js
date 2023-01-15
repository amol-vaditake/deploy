const { Router } = require('express');

const { create, deleteRole, get, getById } = require('../controllers/roles');
const auth = require('../middlewares/auth');

const router = Router();
router.post('/create', auth, create);
router.post('/delete', auth, deleteRole);
router.get('/get', auth, get);
router.post('/getById', auth, getById);

module.exports = router;
