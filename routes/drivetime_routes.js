let routes = require('express').Router()
let controller = require('../controller/driver_controller')

/**
 * Sends a block with drivetimes
 * @route GET /drivetimes/senddrive
 * @group Drive Times
 * @return {object} 412 - Missing parameters, check if userID or imei is missing
 * @return {object} 200 - Edit succesfull
 * @returns {object}  500 - Unexpected error
 */
routes.post('/senddrive', controller.sendDriveTimes)
routes.get('/getdrivebyid/:id', controller.getDriveTimeID)

module.exports = routes