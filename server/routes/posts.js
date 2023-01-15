const { Router } = require('express');

const {
  create,
  update,
  deletePost,
  get,
  getById,
} = require('../controllers/posts');
const auth = require('../middlewares/auth');

const router = Router();
router.post('/create', auth, create);
router.post('/update', auth, update);
router.post('/delete', auth, deletePost);
router.get('/get', auth, get);
router.post('/getById', auth, getById);

module.exports = router;
