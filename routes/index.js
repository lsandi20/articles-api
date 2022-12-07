var express = require('express');
var router = express.Router();
var usersRouter = require('./users');


router.use('/api/auth', usersRouter)

module.exports = router;


