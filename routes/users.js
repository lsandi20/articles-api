var express = require('express');
var jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const {v4: uuidv4} = require('uuid')
const saltRound = 10;
let models = require('../models/index');

require('dotenv').config()

var router = express.Router();

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
    phone
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
  let token = jwt.sign({email}, process.env.SECRET_KEY, {expiresIn: '1h'})
  res.json({
    token
  })
} catch (err){
  console.error(err)
  return res.status(500).json(err)
}
})


module.exports = router;
