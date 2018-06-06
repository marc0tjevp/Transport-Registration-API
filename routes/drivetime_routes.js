let routes = require('express').Router()
let controller = require('../controller/driver_controller')

routes.post('/senddrive', controller.sendDriveTimes)
routes.post('/getdrivebyid', controller.getDriveTimeID)

module.exports = routes