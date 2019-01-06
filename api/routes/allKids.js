const User = require('../models/user')
const Kid = require('../models/kid')

allKids = (req, res) => {
  let user = new User()
  user.authenticate(req, res).then(
        (result) => {
            switch(req.method) {
                case 'GET':
                    new Kid(user).all().then((kids) => res.json(kids))
                    break
                case 'POST':
                    new Kid(user).add(req.body).then((kids) => res.json(kids)).catch(err => res.boom.badRequest(null, err))
                    break
                default:
                    res.boom.methodNotAllowed()                
            }
    })
    .catch((err) => {
        if (err.code && err.code == "NotAuthorizedException") {
            res.boom.unauthorized(null, err)    
        } else {
            res.boom.badRequest(null, err)
        }
    })
}

module.exports = allKids
