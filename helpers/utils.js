const jsonwebtoken = require('jsonwebtoken');
const models = require('../models/index')

module.exports = {
    isLoggedIn: async function(req, res, next) {
        try {
            let token = req.headers['authorization'].replace('Bearer ', '')
            let decoded = jsonwebtoken.decode(token)
            let user = await models.User.findOne({where: {email: decoded.email}})
            jsonwebtoken.verify(token, user.secret, (err)=> {
                if (err) {
                    return res.status(401).json({message: 'Unauthorized'})
                }
                next()
            })
        } catch (err) {
            return res.status(401).json({message: 'Unauthorized'})
        }
    }
}