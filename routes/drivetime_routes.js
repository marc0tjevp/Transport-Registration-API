let routes = require('express').Router()
let controller = require('../controller/driver_controller')

routes.post('/drivetimes', controller.sendDriveTimes)

module.exports = routes