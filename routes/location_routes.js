let routes = require('express').Router()
let controller = require('../controller/location_controller')

/**
 * Login to the API with username, password and GUID
 * @route POST /location/:mrn
 * @group location
 * @param {string} lat.required - Latitude of the location
 * @param {string} long.required - Longitude of the location
 * @param {string} dateTime.required - Date and time of the location
 * @returns {object} 200 - "status": success
 * @returns {object} 412 - "msg": "Please define alle required data"
 * @returns {object} 404 - "msg": "mrn not found in db"
 * @returns {object} 401 - "msg": "No valid credentials or imei is incorrect"
 * @returns {object} 500 - Unexpected error
 */
routes.post('/:mrn', controller.insertLocation)

/**
 * Login to the API with username, password and GUID
 * @route GET /location/:mrn
 * @group location
 * @returns {object} 200 - "status": array of locations containing long, lat and the dateTime
 * @returns {object} 404 - "msg": "mrn not found in db"
 * @returns {object} 401 - "msg": "No valid credentials or imei is incorrect"
 * @returns {object} 500 - Unexpected error
 */
routes.get('/:mrn', controller.getLocations)

module.exports = routes