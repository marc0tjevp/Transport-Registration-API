let routes = require('express').Router()

routes.post('/form')
routes.get('/form/:mrn')

module.exports = routes