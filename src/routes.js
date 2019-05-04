const express = require('express')
const validate = require('express-validation')
const routes = express.Router()
const authMiddleware = require('./app/middlewares/auth')
const controllers = require('./app/controller')
const validators = require('./app/validator')
const handle = require('express-async-handler')

routes.post(
  '/users',
  validate(validators.User),
  handle(controllers.UserController.store)
)
routes.post(
  '/sessions',
  validate(validators.Session),
  handle(controllers.SessionController.store)
)

routes.use(authMiddleware)

// Ads
routes.get('/ads', handle(controllers.AdController.index))
routes.get('/ads/:id', handle(controllers.AdController.show))
routes.post(
  '/ads',
  validate(validators.Ad),
  handle(controllers.AdController.store)
)
routes.put(
  '/ads/:id',
  validate(validators.Ad),
  handle(controllers.AdController.update)
)
routes.delete('/ads/:id', handle(controllers.AdController.destroy))

// Purchase

routes.post(
  '/purchase',
  validate(validators.Purchase),
  handle(controllers.PurchaseController.store)
)

module.exports = routes
