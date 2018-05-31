let routes = require('express').Router()
let controller = require('../controller/company_controller')

routes.get('/driver')

// Get Realtime location by Driver ID
routes.post('/driver/:id/location')

// Get Route by Driver Id
routes.get('/driver/:id/route')

// Gets a form by Driver ID
routes.get('/driver/get', controller.getObject)

// Adds a form to a driver by ID
routes.post('/driver/add', controller.putObject)

module.exports = routes