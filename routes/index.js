var express = require('express');
var router = express.Router();
var usersRouter = require('./users');
var articleCategoryRouter = require('./articlecategories') 

router.use('/api/auth', usersRouter)
router.use('/api/article-category', articleCategoryRouter)

module.exports = router;


