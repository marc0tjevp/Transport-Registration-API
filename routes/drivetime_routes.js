let routes = require('express').Router()
let controller = require('../controller/driver_controller')

/**
 * Sends a block with drivetimes
 * @route POST /drivetimes/senddrive
 * @group Drive Times
 * @param {string} starttime.required
 * @param {string} endtime.required
 * @param {string} travelTime.required
 * @param {string} mrn.required
 * @param {string} driverID.required
 * @return {object} 412 - Please make sure to insert startTime,endTime, travelTime, mrn and driverID
 * @return {object} 401 - Driver does not exist
 * @return {object} 500 - SQL error occured
 * @return {object} 200 - Successfully added drivetimes
 * @return {object}  500 - Unexpected error
 */
routes.post('/senddrive', controller.sendDriveTimes)

/**
 * Sends a block with drivetimes
 * @route GET /drivetimes/senddrive
 * @group Drive Times
 * @param {string} driverID.required
 * @return {object} 412 - Please make sure driverID is filled in
 * @return {object} 401 - Drive times for this driverID does not exist
 * @return {object} 500 - An error occured in the SQL query
 * @return {object} 200 - {Object object}
 * @return {object}  500 - Unexpected error
 */
routes.get('/getdrivebyid/:id', controller.getDriveTimeID)

module.exports = routes