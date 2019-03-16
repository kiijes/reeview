var express = require('express');
var router = express.Router();
var User = require('../controller/user.controller');
var Auth = require('../controller/auth.controller');

/* GET users listing. */
router.post('/register', User.register);
router.post('/login', Auth.authenticate);

module.exports = router;
