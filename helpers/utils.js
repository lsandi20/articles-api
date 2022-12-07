const jsonwebtoken = require('jsonwebtoken');

module.exports = {
    isLoggedIn: function(req, res, next) {
        try {
            jsonwebtoken.verify(req.headers['authorization'].replace('Bearer ', ''), process.env.SECRET_KEY, (err)=> {
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