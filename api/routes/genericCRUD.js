const User = require('../models/user')
const GenericEntity = require('../models/genericEntity')

genericCRUD = (req, res) => {
  let user = new User()
  let entity = req.params.entityName.replace("/", "")
  user.authenticate(req, res).then(
        (result) => {
            switch(req.method) {
                case 'GET':
                    console.log(entity)
                    res.boom.methodNotAllowed()
                    new GenericEntity(user, entity).all().then((data) => res.json(data))
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

module.exports = genericCRUD
