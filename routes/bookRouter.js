const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const booksController = require('../controllers/bookController');

router.get('/', auth, booksController.getAll);
router.post('/', auth, booksController.createOne);
router.get('/:id', auth, booksController.getOne);
router.put('/:id', auth, booksController.updateOne);
router.delete('/:id', auth, booksController.deleteOne);

module.exports = router;
