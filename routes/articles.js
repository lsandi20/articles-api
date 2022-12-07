module.exports = function(dirname){
  let express = require('express');
const {v4: uuidv4} = require('uuid')
let models = require('../models/index');
let { isLoggedIn } = require('../helpers/utils')
const { Op } = require('sequelize')
let path = require('path')
let router = express.Router();

router.post('/create', isLoggedIn, async function(req, res, next){
  let {title, short_description, description, category_id, is_visible} = req.body
  try {
  let currentArticle = await models.Article.findOne({where: {title}})
  if (currentArticle) {
    return res.status(400).json({message: 'Article already exists'})
  }
  
  let image;

  if (req.files && req.files.image) {
    let file = req.files.image
    let filename = Date.now() + file.name
    let fileurl = path.join(dirname,'public/images', filename)
    await file.mv(fileurl)
    image = `/images/${filename}`
  }


  let article = await models.Article.create({
    id: uuidv4(),
    title,
    short_description,
    description,
    category_id,
    is_visible,
    image
  })

  res.status(201).json({
    data : article,
    message: "Create Article success"
  })
} catch (err){
  console.error(err)
  return res.status(500).json(err)
}
})

router.get('/', isLoggedIn, async function(req, res, next){
  let {search, size = 1, page = 1} = req.query
  let offset = (page - 1) * size
  let options = {
    limit: size,
    offset
  }
  if (search){
    options.where = {
      title: {
        [Op.iLike]: `%${search}%`
      }
    }
  }
  try {
  let articles = await models.Article.findAll(options)
  res.json({
    data: articles
  })
} catch (err){
  console.error(err)
  return res.status(500).json(err)
}
})

router.get('/:id', isLoggedIn, async function(req, res, next){
    const id = req.params.id
    try {
    let article = await models.Article.findOne({where: {id}})
    res.json({
      data: article
    })
  } catch (err){
    console.error(err)
    return res.status(500).json(err)
  }
  })

return router;
}
