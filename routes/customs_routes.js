let routes = require('express').Router()
let controller = require('../controller/customs_controller')

// Gets a form from the customs (Mock-server)
routes.get('/form/:mrn', controller.getMRNFormFromMockserver)
routes.put('/status/:mrn', controller.sendFreightReadyToMockserver)

module.exports = routes