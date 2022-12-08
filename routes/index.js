module.exports = function(dirname){
let express = require('express');
let router = express.Router();
let usersRouter = require('./users');
let articleCategoryRouter = require('./articlecategories') 
let articleRouter = require('./articles')(dirname)

router.use('/auth', usersRouter)
router.use('/article-category', articleCategoryRouter)
router.use('/article', articleRouter)

return router;
}

