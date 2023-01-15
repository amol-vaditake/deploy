const { Router } = require('express');

const {
  create,
  update,
  deleteComment,
  get,
  getById,
} = require('../controllers/comments');
const auth = require('../middlewares/auth');

const router = Router();
router.post('/create', auth, create);
router.post('/update', auth, update);
router.post('/delete', auth, deleteComment);
router.get('/get', auth, get);
router.post('/getById', auth, getById);

module.exports = router;
