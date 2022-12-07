let express = require('express');
const {v4: uuidv4} = require('uuid')
let models = require('../models/index');
let { isLoggedIn } = require('../helpers/utils')
let router = express.Router();

router.post('/create', isLoggedIn, async function(req, res, next){
  let {title} = req.body
  try {
  let currentArticleCategory = await models.ArticleCategory.findOne({where: {title}})
  if (currentArticleCategory) {
    return res.status(400).json({message: 'Article Category already exists'})
  }

  let articleCategory = await models.ArticleCategory.create({
    id: uuidv4(),
    title
  })

  res.status(201).json({
    data : articleCategory,
    message: "Create Article Category success"
  })
} catch (err){
  console.error(err)
  return res.status(500).json(err)
}
})

router.get('/', isLoggedIn, async function(req, res, next){
  try {
  let articleCategories = await models.ArticleCategory.findAll()
  res.json({
    data: articleCategories
  })
} catch (err){
  console.error(err)
  return res.status(500).json(err)
}
})

router.get('/:id', isLoggedIn, async function(req, res, next){
    const id = req.params.id
    try {
    let articleCategory = await models.ArticleCategory.findOne({where: {id}})
    res.json({
      data: articleCategory
    })
  } catch (err){
    console.error(err)
    return res.status(500).json(err)
  }
  })

module.exports = router;
