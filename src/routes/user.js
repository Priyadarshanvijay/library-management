const express = require('express');
const { loginUser, registerUser } = require('../controllers/user_controller');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/user/login', loginUser);

router.post('/user/register', registerUser);

module.exports = router;