module.exports = function(dirname){
  let express = require('express');
const {v4: uuidv4} = require('uuid')
let models = require('../models/index');
let { isLoggedIn } = require('../helpers/utils')
const { Op } = require('sequelize')
let path = require('path')
let router = express.Router();

/**
 * @openapi
 * tags: 
 *   name: Article
 *   description: API for article
 * /api/article/create:
 *   post:
 *     description: Create a new article
 *     tags: [Article]
 *     requestBody:
 *       content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                example: "Article API Released"
 *              short_description:
 *                type: string
 *                example: "article api released after development"
 *              description:
 *                type: string
 *                example: "<p>article api released after development on software division </p>"
 *              category_id:
 *                type: string
 *                example: "4a89c864-eda8-4270-8a0e-af8409601b56"
 *              is_visible:
 *                type: boolean
 *                example: true
 *              image:
 *                type: file
 *     responses:
 *       201:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                      type: string
 *                      example: "49ae5592-25e9-4064-86d3-87f990fa5360"
 *                     title:
 *                      type: string
 *                      example: "Article API Released"
 *                     short_description:
 *                       type: string
 *                       example: "article api released after development"
 *                     description:
 *                       type: string
 *                       example: "<p>article api released after development on software division </p>"
 *                     category_id:
 *                       type: string
 *                       example: "4a89c864-eda8-4270-8a0e-af8409601b56"
 *                     is_visible:
 *                       type: boolean
 *                       example: true
 *                     image:
 *                       type: string
 *                       example: "/images/1670476508004app.png"
 *                     updatedAt:
 *                       type: timestamp
 *                       example: "2022-12-08T04:01:56.436Z"
 *                     createdAt:
 *                       type: timestamp
 *                       example: "2022-12-08T04:01:56.436Z"
 *                 message: 
 *                   type: string
 *                   example: "Create Article success"
 *       400:
 *        content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message: 
 *                 type: string
 *                 example: "Article already exists"
 *       401:
 *        content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message: 
 *                 type: string
 *                 example: "Unauthorized"
 *       500:
 *         description: Internal Server Error
 */   


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

/**
 * @openapi
 * /api/article/:
 *   get:
 *     description: Get articles
 *     tags: [Article]
 *     parameters:
 *      - in: query
 *        name: search
 *        required: false
 *        description: Search value
 *        example: player
 *      - in: query
 *        name: size
 *        required: false
 *        description: size of returned articles
 *        example: 1
 *      - in: query
 *        name: page
 *        required: false
 *        description: page of returned articles
 *        example: 1
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                        type: string
 *                        example: "49ae5592-25e9-4064-86d3-87f990fa5360"
 *                       title:
 *                        type: string
 *                        example: "Article API Released"
 *                       short_description:
 *                         type: string
 *                         example: "article api released after development"
 *                       description:
 *                         type: string
 *                         example: "<p>article api released after development on software division </p>"
 *                       category_id:
 *                         type: string
 *                         example: "4a89c864-eda8-4270-8a0e-af8409601b56"
 *                       is_visible:
 *                         type: boolean
 *                         example: true
 *                       image:
 *                         type: string
 *                         example: "/images/1670476508004app.png"
 *                       updatedAt:
 *                         type: timestamp
 *                         example: "2022-12-08T04:01:56.436Z"
 *                       createdAt:
 *                         type: timestamp
 *                         example: "2022-12-08T04:01:56.436Z"
 *                 size: 
 *                   type: number
 *                   example: 1
 *                 page:
 *                   type: number
 *                   example: 1
 *                 total:
 *                   type: number
 *                   example: 4
 *       401:
 *        content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message: 
 *                 type: string
 *                 example: "Unauthorized"
 *       500:
 *         description: Internal Server Error
 */   

router.get('/', async function(req, res, next){
  let {search, size = 1, page = 1} = req.query
  let offset = (page - 1) * size
  let options = {
    limit: size,
    offset
  }
  let where = {}
  if (search){
    where = {
      title: {
        [Op.iLike]: `%${search}%`
      }
    }
    options.where = where
  }
  try {
  let articles = await models.Article.findAll(options)
  let total = await models.Article.count({where})
  res.json({
    data: articles,
    size: parseInt(size),
    page: parseInt(page),
    total
  })
} catch (err){
  console.error(err)
  return res.status(500).json(err)
}
})

/**
 * @openapi
 * /api/article/{id}:
 *   get:
 *     description: Get article by id
 *     tags: [Article]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Article id
 *        example: 4a89c864-eda8-4270-8a0e-af8409601b56
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                      type: string
 *                      example: "49ae5592-25e9-4064-86d3-87f990fa5360"
 *                     title:
 *                      type: string
 *                      example: "Article API Released"
 *                     short_description:
 *                       type: string
 *                       example: "article api released after development"
 *                     description:
 *                       type: string
 *                       example: "<p>article api released after development on software division </p>"
 *                     category_id:
 *                       type: string
 *                       example: "4a89c864-eda8-4270-8a0e-af8409601b56"
 *                     is_visible:
 *                       type: boolean
 *                       example: true
 *                     image:
 *                       type: string
 *                       example: "/images/1670476508004app.png"
 *                     updatedAt:
 *                       type: timestamp
 *                       example: "2022-12-08T04:01:56.436Z"
 *                     createdAt:
 *                       type: timestamp
 *                       example: "2022-12-08T04:01:56.436Z"
 *       401:
 *        content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message: 
 *                 type: string
 *                 example: "Unauthorized"
 *       500:
 *         description: Internal Server Error
 */   


router.get('/:id', async function(req, res, next){
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
