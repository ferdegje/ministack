const User = require('../models/user')
const GenericEntity = require('../models/genericEntity')

genericCRUD = (req, res) => {
  let user = new User()
  let entity = req.params.entityName.replace("/", "")
  user.authenticate(req, res).then(
        (result) => {
            console.log(req.params)
            if ("objectId" in req.params) {
                switch(req.method) {
                    case 'GET':
                        new GenericEntity(user, entity).get(req.params.objectId).then((data) => res.json(data))
                        break
                    case 'DELETE':
                        new GenericEntity(user, entity).delete(req.params.objectId).then((data) => res.json(data)).catch(err => res.boom.badRequest(null, err))
                        break
                    default:
                        res.boom.methodNotAllowed()                
                }
            } else {
                switch(req.method) {
                    case 'GET':
                        new GenericEntity(user, entity).all().then((data) => res.json(data))
                        break
                    case 'POST':
                        new GenericEntity(user, entity).add(req.body).then((data) => res.json(data)).catch(err => res.boom.badRequest(null, err))
                        break
                    default:
                        res.boom.methodNotAllowed()                
                }
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
