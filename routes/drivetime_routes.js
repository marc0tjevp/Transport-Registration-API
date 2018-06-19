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
 * @return {ApiResponse.model} 412 - Please make sure to insert startTime,endTime, travelTime, mrn and driverID
 * @return {ApiResponse.model} 401 - Driver does not exist
 * @return {ApiResponse.model} 200 - Successfully added drivetimes
 * @return {ApiResponse.model} 500 - Unexpected error
 */
routes.post('/senddrive', controller.sendDriveTimes)

/**
 * Sends a block with drivetimes
 * @route GET /drivetimes/senddrive
 * @group Drive Times
 * @param {string} driverID.required
 * @return {ApiResponse.model} 412 - Missing Parameters, check if driverID is missin
 * @return {ApiResponse.model} 401 - There are no drivetimes for this driver
 * @return {ApiResponse.model} 200 - []
 * @return {ApiResponse.model} 500 - Unexpected error
 */
routes.get('/getdrivebyid', controller.getDriveTimeID)

/**
 * Gets all drivetimes for a specific cargo
 * @route GET /drivetimes/getdrivebymrn/:mrn
 * @group Drive Times
 * @param {string} mrn.required
 * @return {ApiResponse.model} 412 - Missing Parameters, check if mrn is missing
 * @return {ApiResponse.model} 401 - There are no drivetimes for this driver
 * @return {ApiResponse.model} 200 - []
 * @return {ApiResponse.model} 500 - Unexpected error
 */
routes.get('/getdrivebymrn/:mrn',controller.getDriveTimeMRN)

module.exports = routes