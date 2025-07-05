

const express = require('express');
const router = 
const { register, login } = require('../controller/authController');

router.post('/rester', register);
router.post('/login', login);

module.exports = router;
