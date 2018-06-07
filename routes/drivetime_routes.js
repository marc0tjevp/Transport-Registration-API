let routes = require('express').Router()
let controller = require('../controller/driver_controller')

routes.post('/senddrive', controller.sendDriveTimes)
routes.get('/getdrivebyid/:id', controller.getDriveTimeID)

module.exports = routes