let routes = require('express').Router()

// Gets a form from the customs (Mock-server)
routes.get('/form/:mrn')

module.exports = routes