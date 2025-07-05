
const express = require('express');
const router = express.Router();
const { testuserController } = require("../controller/testController");

//routes get
router.get("/test-user", testuserController);
//module
module.exports = router