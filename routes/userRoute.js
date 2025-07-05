
const express = require('express');
const user_route = express();

const userController = require('../controller/userController'); 
user_route.get('/register', userController.loadRegister);


module.exports = user_route;