let express = require('express');
const {v4: uuidv4} = require('uuid')
let models = require('../models/index');
let { isLoggedIn } = require('../helpers/utils')
let router = express.Router();

/**
 * @openapi
 * tags: 
 *   name: Article Category
 *   description: API for article category
 * /api/article-category/create:
 *   post:
 *     description: Create a new article category
 *     tags: [Article Category]
 *     requestBody:
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                example: "Economy"
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
 *                      example: "3b69e667-0ffd-4cd1-8b86-aa1b1e5ea22a"
 *                     title:
 *                       type: string
 *                       example: "Economy"
 *                     updatedAt:
 *                       type: timestamp
 *                       example: "2022-12-08T04:01:56.436Z"
 *                     createdAt:
 *                       type: timestamp
 *                       example: "2022-12-08T04:01:56.436Z"
 *                 message: 
 *                   type: string
 *                   example: "Create Article Category success"
 *       400:
 *        content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message: 
 *                 type: string
 *                 example: "Article Category already exists"
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

/**
 * @openapi
 * /api/article-category/:
 *   get:
 *     description: Get article categories
 *     tags: [Article Category]
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
 *                        example: "3b69e667-0ffd-4cd1-8b86-aa1b1e5ea22a"
 *                       title:
 *                         type: string
 *                         example: "Economy"
 *                       updatedAt:
 *                         type: timestamp
 *                         example: "2022-12-08T04:01:56.436Z"
 *                       createdAt:
 *                         type: timestamp
 *                         example: "2022-12-08T04:01:56.436Z"
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

/**
 * @openapi
 * /api/article-category/{id}:
 *   get:
 *     description: Get article category by id
 *     tags: [Article Category]
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Article category id
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
 *                      example: "3b69e667-0ffd-4cd1-8b86-aa1b1e5ea22a"
 *                     title:
 *                       type: string
 *                       example: "Economy"
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
