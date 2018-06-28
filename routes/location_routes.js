let routes = require('express').Router()
let controller = require('../controller/location_controller')

/**
 * Post a drivers location to the database
 * @route POST /location/post/:mrn
 * @group Location
 * @param {string} lat.required - Latitude of the location
 * @param {string} long.required - Longitude of the location
 * @param {string} dateTime.required - Date and time of the location
 * @returns {ApiResponse.model} 200 - Added location into database
 * @returns {ApiResponse.model} 412 - Parameters missing, please check if mrn, latitude, longitude or datetime is missing
 * @returns {ApiResponse.model} 404 - There are no location pointers for this MRN
 * @returns {ApiResponse.model} 500 - Unexpected error
 */
routes.post('/post/:mrn', controller.insertLocation)

/**
 * Get a drivers location from the database
 * @route GET /location/get/:mrn
 * @group Location
 * @returns {ApiResponse.model} 200 - []
 * @returns {ApiResponse.model} 404 - There are no location pointers for this MRN
 * @returns {ApiResponse.model} 500 - Unexpected error
 */
routes.get('/get/:mrn', controller.getLocations)

module.exports = routes