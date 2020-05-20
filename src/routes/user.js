const express = require('express');
const { loginUser, registerUser, getIssuedHistory, deleteIssuedHistory } = require('../controllers/user_controller');
const auth = require('../middleware/auth');
const admin_auth = require('../middleware/admin_auth');

const router = new express.Router();

router.post('/user/login', loginUser);

router.post('/user/register', admin_auth, registerUser);

router.get('/user/issued', auth,  getIssuedHistory);

router.delete('/user/issued/:id', auth,  deleteIssuedHistory);

module.exports = router;