let routes = require('express').Router()
let auth = require('../controller/authentication_controller')

routes.post('/login', auth.login)
routes.post('/register', auth.register)

module.exports = routes