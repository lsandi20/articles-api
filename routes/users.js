let express = require('express');
let jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const {v4: uuidv4} = require('uuid');
const saltRound = 10;
let models = require('../models/index');
const { isLoggedIn } = require('../helpers/utils');

require('dotenv').config()

let router = express.Router();

/**
 * @openapi
 * tags: 
 *   name: Auth
 *   description: API for authentication
 * /api/auth/register:
 *   post:
 *     description: Register new user
 *     tags: [Auth]
 *     requestBody:
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                example: "Budi"
 *              email:
 *                type: string
 *                example: "budi@email.com"
 *              password:
 *                type: string
 *                example: "pAssw0rd"
 *              phone:
 *                type: string
 *                example: "0832131321"
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
 *                      example: "fc884b03-70a2-42de-9a71-0ff7062fa415"
 *                     name:
 *                       type: string
 *                       example: "Budi"
 *                     email:
 *                       type: string
 *                       example: "budi@email.com"
 *                     password:
 *                       type: string
 *                       example: "$2b$10$AEuMDtn0nhOUkuJFmcqDO.eomz2TdrZ6lUGMOpV/tz6PB9iRyfejK"
 *                     phone:
 *                       type: string
 *                       example: "0832131321"
 *                     updatedAt:
 *                       type: timestamp
 *                       example: "2022-12-08T04:01:56.436Z"
 *                     createdAt:
 *                       type: timestamp
 *                       example: "2022-12-08T04:01:56.436Z"
 *                 message: 
 *                   type: string
 *                   example: "Register success"
 *       400:
 *        content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message: 
 *                 type: string
 *                 example: "User email already exists"
 *       500:
 *         description: Internal Server Error
 */   

router.post('/register', async function(req, res, next){
  let {name, email, password, phone} = req.body
  try {
  let currentUser = await models.User.findOne({where: {email}})
  if (currentUser) {
    return res.status(400).json({message: 'User email already exists'})
  }
  password = bcrypt.hashSync(password, saltRound)

  let user = await models.User.create({
    id: uuidv4(),
    name,
    email,
    password,
    phone,
    secret: uuidv4()
  })

  res.status(201).json({
    data : user,
    message: "Register success"
  })
} catch (err){
  console.error(err)
  return res.status(500).json(err)
}
})

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     description: Login
 *     tags: [Auth]
 *     requestBody:
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: "budi@email.com"
 *              password:
 *                type: string
 *                example: "pAssw0rd"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token: 
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJ1ZGlAZW1haWwuY29tIiwiaWF0IjoxNjcwNDczMjYxLCJleHAiOjE2NzA0NzY4NjF9.55OiqcjNes73GzDfSCTp9VBtUp2xFTSQ-6TTB4B0DRQ"
 *       400:
 *         description: User email not found or password not match
 *       500:
 *         description: Internal Server Error
 */   


router.post('/login', async function(req, res, next){
  let {email, password} = req.body
  try {
  let user = await models.User.findOne({where: {email}})
  if (!user) {
    return res.status(400).json({message: 'User email not found'})
  }
  
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(400).json({message: 'Password not match'})
  } 
  let token = jwt.sign({email}, user.secret, {expiresIn: '1h'})
  res.json({
    token
  })
} catch (err){
  console.error(err)
  return res.status(500).json(err)
}
})

/**
 * @openapi
 * /api/auth/logout:
 *   get:
 *     description: Logout
 *     tags: [Auth]
 *     requestBody:
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: "budi@email.com"
 *              password:
 *                type: string
 *                example: "pAssw0rd"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   example: "Logout success"
 *       500:
 *         description: Internal Server Error
 */   


router.get('/logout', isLoggedIn, async function(req, res, next){
  try {
  let token = req.headers['authorization'].replace('Bearer ', '')
  let decoded = jwt.decode(token)
  let user = await models.User.update({secret: uuidv4()}, {where: {email: decoded.email}})
  res.json({
    message: "Logout success"
  })
  } catch (err){
    console.error(err)
    return res.status(500).json(err)
  }
})


module.exports = router;
