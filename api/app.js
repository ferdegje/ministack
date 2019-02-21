'use strict'
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const app = express()
const boom = require('express-boom');
const router = express.Router()
var register = require('./routes/register')
var validate = require('./routes/validate')
var userDelete = require('./routes/userDelete')
var userGet = require('./routes/userGet')
var genericCRUD = require('./routes/genericCRUD')
var mediaUploadLink = require('./routes/mediaUploadLink')
app.set('view engine', 'pug')

if (process.env.cognitoPoolId === undefined) {
    console.error("Environment variable cognitoPoolId needs to be defined. It can be retrieved from the Terraform output.")
    process.exit(2)
}
if (process.env.cognitoClientId === undefined) {
  console.error("Environment variable cognitoClientId needs to be defined. It can be retrieved from the Terraform output.")
  process.exit(2)
}
if (process.env.projectName === undefined) {
  console.error("Environment variable projectName needs to be defined. It can be retrieved from the Terraform output.")
  process.exit(2)
}
// if (process.env.NODE_ENV === 'test') {
//   // NOTE: aws-serverless-express uses this app for its integration tests
//   // and only applies compression to the /sam endpoint during testing.
//   router.use('/sam', compression())
// } else {
//   router.use(compression())
// }

router.use(cors())
router.use(boom());
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
router.use(awsServerlessExpressMiddleware.eventContext())

// NOTE: tests can't find the views directory without this
app.set('views', path.join(__dirname, 'views'))

router.get('/ping', (req, res) => {
  res.json("pong")
})
router.get('/mediauploadlink', mediaUploadLink)
router.post('/register', register)
router.post('/validate', validate)
router.get('/user', userGet)
router.delete('/user', userDelete)
router.all('/:entityName([a-zA-Z0-9]+)', genericCRUD)
router.all('/:entityName([a-zA-Z0-9]+)/:objectId([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})', genericCRUD)


// The aws-serverless-express library creates a server and listens on a Unix
// Domain Socket for you, so you can remove the usual call to app.listen.
// app.listen(3000)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/', router)

// Export your express server so you can import it in the lambda function.
module.exports = app
