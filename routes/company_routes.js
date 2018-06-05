let routes = require('express').Router()
let controller = require('../controller/company_controller')

/**
 * @route GET /company/driver/get
 * @group Company - Routes used by the company
 * @param {id} userID.required - The userID is extracted from the JWT token
 * @returns {object} 200 - An array of forms per driver
 * @returns {Error}  default - Unexpected error
 */
routes.get('/driver/get', controller.getFormsByDriver)

/**
 * @route POST /company/driver/register
 * @group Company - Routes used by the company
 * @param {int} driverID.required - The driverID is used to connect the cargo and the driver
 * @param {string} mrn.required - The MRN is used to check if the cargo exists, if it does it gets connected to the driver
 * @returns {object} 200 - "msg": "Registered Driver to form"
 * @returns {object} 419 - "msg": "Please provide a driverID and MRN"
 * @returns {object} 404 - "msg": "The form with this mrn does not exists"
 * @returns {object} 404 - "msg": "Driver does not exist"
 * @returns {object} 409 - "msg": "MRN is already registered to a driver"
 * @returns {Error}  default - Unexpected error
 */
routes.post('/driver/register', controller.registerDriver)

module.exports = routes