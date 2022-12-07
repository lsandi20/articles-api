module.exports = function(dirname){
let express = require('express');
let router = express.Router();
let usersRouter = require('./users');
let articleCategoryRouter = require('./articlecategories') 
let articleRouter = require('./articles')(dirname)

router.use('/api/auth', usersRouter)
router.use('/api/article-category', articleCategoryRouter)
router.use('/api/article', articleRouter)

return router;
}

