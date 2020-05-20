const express = require('express');
const { loginUser } = require('../controllers/user_controller');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/user/login', loginUser);

module.exports = router;