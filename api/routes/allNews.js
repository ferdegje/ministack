const User = require('../models/user')
const News = require('../models/news')

allNews = (req, res) => {
  let user = new User()
  user.authenticate(req, res).then(
        (result) => {
            switch(req.method) {
                case 'GET':
                    new News(user).all().then((news) => res.json(news))
                    break
                case 'POST':
                    new News(user).add(req.body).then((news) => res.json(news))
                    .catch(err => res.boom.badRequest(null, err))
                    break
                case 'DELETE':
                    new News(user).delete(req.params.newsId).then((result) => res.json(result))
                    break
                default:
                    res.boom.methodNotAllowed()                
            }
    })
    // .catch((err) => {
    //     if (err.code && err.code == "NotAuthorizedException") {
    //         res.boom.unauthorized(null, err)    
    //     } else {
    //         res.boom.badRequest(null, err)
    //     }
    // })
}

module.exports = allNews
