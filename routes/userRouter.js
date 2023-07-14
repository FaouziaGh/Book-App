require('dotenv').config();
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth.js');

router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.get('/me', auth, (req, res) => {
  res.send(req.user);
});

module.exports = router;
